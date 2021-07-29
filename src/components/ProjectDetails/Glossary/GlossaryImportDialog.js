import React, { useState, useEffect, useRef, memo } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import CustomTextField from 'components/CustomTextField';
import { addTerm } from 'api/projects';
import { showToast } from 'redux/actions/toast';
import CustomModal from 'components/CustomModal';
import { useStyles } from 'styles/customTextField';
import { GLOSSARY_DEFAULT_PAGE } from 'constants/projectDetails';
import { getProjectGlossaryRequest } from 'redux/actions/projects';

const StyledTableRow = withStyles((theme) => (
  { root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } } }
))(TableRow);

function GlossaryImportDialog({ glossaries, open, onClose }) {
  const classes = useStyles();
  const { projectId } = useParams();
  const [tlangauges, setTlanguages] = useState([]);
  let colLenth = useRef(null);
  const { languages, per_page } = useSelector(({ projects }) => projects.glossary);
  const dispatch = useDispatch();

  useEffect(() => {
    colLenth = glossaries[0]?.length;
    setTlanguages(Array(colLenth).fill('skip'));
  }, [glossaries]);

  const getTermLangArr = (gl) => {
    const terms = [];
    for (const row of gl) {
      const trans = [];
      for (let i = 0; i < row.length; i += 1) {
        if (tlangauges[i] !== 'skip' && row[i] !== '') {
          trans.push({
            name: row[i],
            language: tlangauges[i],
          });
        }
      }
      if (trans.length !== 0) {
        terms.push({ translations: trans });
      }
    }
    return terms;
  };

  const handleOnCancel = () => {
    onClose();
  };

  const handleOnSave = () => {
    for (const lang of tlangauges) {
      if (lang === '') return;
    }

    if (tlangauges.every((lang) => lang === 'skip')) {
      dispatch(showToast({
        type: 'error',
        message: 'Select a language to import glossary',
      }))
      return
    }

    addTerm(projectId, { terms: getTermLangArr(glossaries) })
      .then((res) => {
        if (res.error) throw res;

        dispatch(showToast({
          type: 'success',
          message: 'Glossary imported successfully!',
        }));

        const qp = queryString.parse(window.location.search);
        dispatch(getProjectGlossaryRequest({
          projectId,
          page: GLOSSARY_DEFAULT_PAGE,
          perPage: per_page,
          searchTerm: qp.search_term,
          orderBy: qp.order_by,
          order: qp.order,
          orderByLang: qp.order_by_lang,
          searchFilter: {
            lang: qp.search_lang,
            col: qp.search_col,
          },
        }));
      })
      .catch((err) => {
        const errorMsg = err?.data?.message
          ?? err?.data?.detail
          ?? 'Failed to import glossary!';

        dispatch(showToast({
          type: 'error',
          message: errorMsg,
        }))
      })
      .finally(() => handleOnCancel());
    onClose();
  };

  const handleLangSelectionChange = (rowIndex, { target: { value } }) => {
    const newArr = [...tlangauges];
    newArr[rowIndex] = value;
    setTlanguages(newArr);
  };

  const getTableRows = (TableData) => (
    TableData.map((col) => {
      const row = col.map((item) => <TableCell align='center'>{item}</TableCell>);
      return (
        <StyledTableRow component='th' scope='row'>{row}</StyledTableRow>
      );
    })
  );

  return (
    <CustomModal
      open={open}
      onClose={handleOnCancel}
      aria-labelledby='form-dialog-title'
      maxWidth='lg'
    >
      <div className='overflow-auto'>
        <DialogTitle className='p-3'>Import</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                {
                  tlangauges?.map((row, index) => (
                    <TableCell>
                      <CustomTextField
                        key={row}
                        value={tlangauges[index]}
                        onChange={handleLangSelectionChange.bind(this, index)}
                        variant='outlined'
                        placeholder='Select language'
                        inputClasses={classes.selectInputStyles}
                        select
                      >
                        {
                          languages.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              disabled={tlangauges?.includes(option.value)}
                            >
                              {option.label}
                            </MenuItem>
                          ))
                        }
                        <MenuItem
                          key='skip'
                          value='skip'
                        >
                          skip
                        </MenuItem>
                      </CustomTextField>
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                getTableRows(glossaries)
              }
            </TableBody>
          </Table>
        </DialogContent>
      </div>
      <DialogActions>
        <button className='btn btn-default py-3 px-6 mr-4' onClick={handleOnCancel} type='button'>Cancel</button>
        <button className='btn btn-primary py-3 px-6' onClick={handleOnSave} type='button'>Import</button>
      </DialogActions>
    </CustomModal>
  );
}

GlossaryImportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  glossaries: PropTypes.array.isRequired,
};

export default memo(GlossaryImportDialog)
