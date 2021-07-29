import React, { useCallback, useState, useRef, memo } from 'react';
import { Tooltip } from '@material-ui/core';
import SVG from 'react-inlinesvg';
import { useSelector, useDispatch } from 'react-redux';
import XLSX from 'xlsx';
import { showToast } from 'redux/actions/toast';
import IconBox from 'components/IconBox';
import GlossaryImportDialog from './GlossaryImportDialog';

function ImportGlossary() {
  const [glossaries, setGlossaries] = useState([]);
  const [isModalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();

  const importFileInputRef = useRef(null);
  const glossary = useSelector(({ projects }) => projects.glossary);

  const handleImportFileBtnClick = useCallback(() => {
    importFileInputRef.current.click();
  }, [importFileInputRef.current]);

  const handleImportFile = useCallback(({ target: { files } }) => {
    const fileReader = new FileReader();

    fileReader.onabort = () => dispatch(showToast({
      type: 'error',
      message: 'file reading was aborted',
    }));
    fileReader.onerror = () => dispatch(showToast({
      type: 'error',
      message: 'file reading has failed',
    }));
    fileReader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetNameList = workbook.SheetNames[0];

      const jsonFromExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList], {
        blankRows: false,
        raw: false,
        dateNF: 'MM-DD-YYYY',
        header: 1,
        defval: '',
      });

      setGlossaries(jsonFromExcel);
      setModalOpened(true);
    };

    fileReader.readAsBinaryString(files[0]);
  }, []);

  const handleModalClose = useCallback(() => {
    importFileInputRef.current.value = null;
    setModalOpened(false);
  }, [importFileInputRef.current]);

  if (!Object.values(glossary).length) return null;

  return (
    <>
      <GlossaryImportDialog
        open={isModalOpened}
        onClose={handleModalClose}
        glossaries={glossaries}
      />
      <Tooltip title='Import glossary' arrow>
        <span>
          <IconBox variant='dark' className='mr-4' onClick={handleImportFileBtnClick}>
            <SVG src='/media/svg/icons/General/Import.svg' />
          </IconBox>
        </span>
      </Tooltip>
      <input
        type='file'
        accept='.xlsx, .xls, .csv'
        ref={importFileInputRef}
        onChange={handleImportFile}
        hidden
      />
    </>
  );
}

export default memo(ImportGlossary)
