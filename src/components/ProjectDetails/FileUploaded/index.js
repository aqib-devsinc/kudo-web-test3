import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import fileSize from 'filesize';
import { useStyles } from 'styles/projectDetails';
import { getLangLabel } from 'helpers/languages';
import { FILE_DETAIL_ACTIONS_TYPES } from 'constants/projectDetails';
import FileCorpusViewModal from './FileCorpusViewModal';
import FileViewerModal from './FileViewerModal';
import FileDeleteConfirmationModal from './FileDeleteConfirmationModal';
import FileActionsMenu from './FileActionsMenu';

export default function FileUploaded() {
  const {
    project,
    languages,
  } = useSelector(({ projects }) => ({
    project: projects.current,
    languages: projects.glossary.languages,
  }));
  const [isModalOpened, setModalOpened] = useState(false);
  const [isDeleteConfirmationModalOpened, setDeleteConfirmationModalOpened] = useState(false);
  const [isFileViewerOpened, setFileViewerOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [fileToView, setFileToView] = useState({});
  const [viewFileDetailsType, setViewFileDetailsType] = useState('');

  const classes = useStyles();

  const handleCloseModal = useCallback(() => {
    setSelectedFile({});
    setModalOpened(false);
    setViewFileDetailsType('');
  });

  const handleCloseFileViewerModal = useCallback(() => {
    setFileViewerOpened(false);
  });

  const handleCloseFileDeleteConfirmationModal = useCallback(() => {
    setDeleteConfirmationModalOpened(false);
  });

  const handleViewFileDetails = useCallback((file, actionType) => {
    if (actionType === FILE_DETAIL_ACTIONS_TYPES.all_summary.value) setSelectedFile(file);
    else {
      setSelectedFile({
        name: file.metadata.name,
        corpusLink: file.corpus,
        id: file.id,
      });
    }

    setViewFileDetailsType(actionType);
    setModalOpened(true);
  });

  const handleFileViewer = useCallback((file) => {
    setFileToView(file);
    setFileViewerOpened(true);
  });

  const truncateFileName = (fileName, fileVersion) => {
    if (fileName.length > 20) fileName = `${fileName.substring(0, 20)}...${fileName.substring(fileName.length - 10)}`;

    fileName += `(${fileVersion})`;

    return fileName;
  };

  if (!project.files.length) return null;

  return (
    <>
      <FileCorpusViewModal
        actionType={viewFileDetailsType}
        open={isModalOpened}
        file={selectedFile}
        onClose={handleCloseModal}
      />
      <FileViewerModal
        open={isFileViewerOpened}
        file={fileToView}
        onClose={handleCloseFileViewerModal}
      />
      <FileDeleteConfirmationModal
        open={isDeleteConfirmationModalOpened}
        file={selectedFile}
        onClose={handleCloseFileDeleteConfirmationModal}
      />
      <Paper className={`${classes.fileUploaded} p-4`}>
        <div>
          <h3 className='mb-10 mt-3 d-inline-block'>Uploaded Files</h3>
          {/* <div className='d-inline-block float-right'>
            <button
              className='btn bg-light ml-4'
              onClick={
                handleViewFileDetails.bind(this, { id: true },
                `${FILE_DETAIL_ACTIONS_TYPES.all_summary.value}`)
              }
              type='button'
              disabled
            >
              All File Summary
            </button>
          </div> */}
        </div>
        <div className={classes.filesWrapper}>
          {
            project.files.map((file) => (
              <Row key={file.id} className='mb-5 justify-content-between'>
                <Col className='d-flex align-items-center pointer' onClick={handleFileViewer.bind(this, file)}>
                  <div className={`mr-4 ${classes.fileIconWrapper}`}>
                    <SVG src={`/media/svg/icons/Files/file-${file.metadata.name.split('.').pop()}.svg`} />
                  </div>
                  <div className='flex-1 flex-column'>
                    <p className='mb-1 word-break'>
                      {`${truncateFileName(
                        file.metadata.name,
                        file.metadata.version,
                      )}`}
                    </p>
                    <span className='text-muted'>
                      { getLangLabel(file.metadata.language || project.primary_language, languages) }
                      , &nbsp;
                      { fileSize(file.metadata.size) }
                    </span>
                  </div>
                </Col>
                <FileActionsMenu
                  file={file}
                  handleViewFileDetails={handleViewFileDetails}
                  setSelectedFile={setSelectedFile}
                  setDeleteConfirmationModalOpened={setDeleteConfirmationModalOpened}
                  setViewFileDetailsType={setViewFileDetailsType}
                  setModalOpened={setModalOpened}
                />
              </Row>
            ))
          }
        </div>
      </Paper>
    </>
  );
}
