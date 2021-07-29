import React, { useContext, useEffect, useState } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal';
import CustomTextField from 'components/CustomTextField';
import NewProjectFormContext from 'context/newProjectForm';
import { useStyles } from 'styles/newProject';

export default function LanguageSelectionDialog({ open, langSelectionFileExts, onClose, onCancel, fileLanguages }) {
  const [files, setFiles] = useState([]);
  const { values } = useContext(NewProjectFormContext);
  const classes = useStyles();

  useEffect(() => {
    setFiles(values.files
      .filter(({ attachment, language }) => langSelectionFileExts.includes(attachment.name.split('.').pop())
        && !language));
  }, [values.files]);

  const handleLangSelectionChange = (fileIndex, { target: { value } }) => {
    setFiles((prevFiles) => {
      const duplicateFiles = [...prevFiles];
      duplicateFiles[fileIndex].language = value;
      return duplicateFiles;
    });
  };

  const handleOnSave = () => {
    for (const file of files) {
      if (!file.language) return;
    }

    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={onCancel.bind(this, files)}
      aria-labelledby='form-dialog-title'
      fullWidth
    >
      <div className={classes.modalWrapper}>
        <DialogTitle className='p-0'>Audio / Video File Language</DialogTitle>
        <DialogContent className='mt-10 mb-10'>
          {
            files.map(({ attachment, language }, index) => (
              <div key={index} className='row mb-4'>
                <div className='col-3'>
                  <span className={classes.wordBreak}>{ attachment.name }</span>
                </div>
                <div className='col'>
                  <CustomTextField
                    name={`files_lang-${index}`}
                    value={language || ''}
                    onChange={handleLangSelectionChange.bind(this, index)}
                    variant='outlined'
                    placeholder='Select language'
                    error={!language && 'Required'}
                    select
                    required
                    fullWidth
                  >
                    {fileLanguages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </div>
              </div>
            ))
          }
        </DialogContent>
        <hr />
        <DialogActions>
          <button
            className='btn btn-default py-3 px-6 mr-4'
            type='button'
            onClick={onCancel.bind(this, files)}
          >
            Cancel
          </button>
          <button className='btn btn-primary py-3 px-6' onClick={handleOnSave} type='button'>Save</button>
        </DialogActions>
      </div>
    </CustomModal>
  );
}

LanguageSelectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  langSelectionFileExts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  fileLanguages: PropTypes.array.isRequired,
};
