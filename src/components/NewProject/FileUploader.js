import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import NewProjectFormContext from 'context/newProjectForm';
import { useStyles } from 'styles/newProject';
import { PRIMARY_LANGS } from 'constants/project';
import LanguageSelectionDialog from './LanguageSelectionDialog';

const { PUBLIC_URL } = process.env;
const ALLOWED_FILE_EXTS = ['.doc', '.docx', '.odt', '.pdf', '.mp4', '.wav', '.ppt', '.pptx', '.txt'];
const LANG_SELECTION_FILE_EXTS = ['wav', 'mp4'];
const MAX_TOTAL_FILES_SIZE = 157286400;

export default function FileUploader({ name }) {
  const { values, errors, setFieldValue } = useContext(NewProjectFormContext);
  const [isModalOpened, setModalOpened] = useState(false);
  const [fileErrors, setFileErrors] = useState([]);
  const [fileLanguages, setFileLanguages] = useState([]);
  const classes = useStyles();

  const languages = [values.primary_language, ...values.secondary_languages.map((lang) => lang.value)];

  useEffect(() => {
    setFileLanguages([
      Object.values(PRIMARY_LANGS).find(
        (lang) => lang.value === values.primary_language,
      ),
      ...values.secondary_languages,
    ].filter((lang) => lang));
  }, [values.secondary_languages, values.primary_language]);

  useEffect(() => {
    const validFiles = [...values.files];

    values.files.forEach((file) => {
      if (!LANG_SELECTION_FILE_EXTS.includes(file.attachment.name.split('.').pop())) return;

      if (!languages.includes(file.id ? file.metadata.language : file.language)) {
        const fileIndex = validFiles.findIndex((vf) => (
          vf.attachment.name === file.attachment.name && vf.attachment.path === file.attachment.path
        ));

        if (fileIndex === -1) return;

        validFiles.splice(fileIndex, 1);
      }
    });

    if (validFiles.length) setFieldValue('files', validFiles);
  }, [values.secondary_languages, values.primary_language]);

  let totalFilesSize = values.files.reduce((totalSize, file) => totalSize + file.attachment.size, 0);

  const setErrorTimeout = () => {
    setTimeout(() => setFileErrors([]), 2000);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = [];
    const duplicateFileErrors = [];

    acceptedFiles.forEach((acceptedFile) => {
      let isFileValid = true;

      totalFilesSize += acceptedFile.size;

      if (totalFilesSize > MAX_TOTAL_FILES_SIZE) {
        duplicateFileErrors.push('Sum of files is greater than 150MB');
        totalFilesSize -= acceptedFile.size;
        isFileValid = false;
        return;
      }

      for (const file of values.files) {
        if (acceptedFile.name === file.attachment.name
          && acceptedFile.path === file.attachment.path
          && acceptedFile.size === file.attachment.size
          && acceptedFile.lastModified === file.attachment.lastModified
        ) {
          isFileValid = false;
          return duplicateFileErrors.push(`${file.attachment.name}: File already attached`);
        }
      }

      if (isFileValid) {
        validFiles.push({
          attachment: acceptedFile,
          language: null,
        });
      }
    });

    if (duplicateFileErrors.length) {
      setFileErrors((prevFileErrors) => [...prevFileErrors, ...duplicateFileErrors]);
      setErrorTimeout();
    }

    if (!validFiles.length) return;

    setFieldValue('files', [...values.files, ...validFiles]);

    for (const file of acceptedFiles) {
      if (LANG_SELECTION_FILE_EXTS.includes(file.name.split('.').pop())) {
        setModalOpened(true);
        return;
      }
    }
  }, [values, setFieldValue]);

  const onDropRejected = useCallback((rejectedFiles) => {
    rejectedFiles.map(({ file, errors: rejectedFileErrors }) => {
      rejectedFileErrors.map((error) => {
        const errorMessage = error.code === 'file-too-large'
          ? `${file.name}: File is larger than 150 MB`
          : `${file.name}: ${error.message}`;
        setFileErrors([...fileErrors, errorMessage]);
      });
      setErrorTimeout();
    });
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ALLOWED_FILE_EXTS,
    onDrop,
    onDropRejected,
    maxSize: MAX_TOTAL_FILES_SIZE,
    multiple: true,
    disabled: !fileLanguages.length,
  });

  const handleDocRemove = (fileIndex) => {
    const files = [...values.files];
    files.splice(fileIndex, 1);

    setFieldValue('files', files);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleOnLanguageSelectCancel = (filesToDiscard) => {
    const validFiles = [...values.files];

    filesToDiscard.forEach((file) => {
      const fileIndex = validFiles.findIndex((vf) => (
        vf.attachment.name === file.attachment.name && vf.attachment.path === file.attachment.path
      ));

      if (fileIndex === -1) return;

      validFiles.splice(fileIndex, 1);
    });

    setFieldValue('files', validFiles);
    handleModalClose();
  };

  const getFileName = (fileName, fileVersion) => {
    if (fileVersion) fileName += `(${fileVersion})`;
    if (fileName.length < 15) return fileName;

    fileName = `${fileName.substring(0, 10)}...${fileName.substring(fileName.length - 6)}`;
    return fileName;
  };

  return (
    <>
      <LanguageSelectionDialog
        open={isModalOpened}
        langSelectionFileExts={LANG_SELECTION_FILE_EXTS}
        onClose={handleModalClose}
        onCancel={handleOnLanguageSelectCancel}
        fileLanguages={fileLanguages}
      />
      <div
        {...getRootProps()}
        className={
          `${classes.dropzone} ${isDragActive ? classes.cursorCopy : ''} ${errors.files ? classes.errorBorder : ''}`
        }
      >
        <input {...getInputProps()} name={name} />
        {
          isDragActive
            ? <p>Release file here  ...</p>
            : (
              <div className='d-flex flex-column'>
                <div className='mt-10 mb-10 text-center'>
                  <img src={`${PUBLIC_URL}/media/svg/icons/Files/upload-arrow.svg`} alt='upload' />
                </div>
                <p className='text-center'>
                  Drop files here or
                  <span style={{ color: '#3699FF' }}> browse</span>
                </p>
                <p style={{ color: '#B5B5C3' }}>
                  File extensions
                  {ALLOWED_FILE_EXTS.join(' ')}
                  {' '}
                  (max 150 MB)
                </p>
              </div>
            )
        }
      </div>
      <div className='col-12'>
        {
          errors.files && <FormHelperText className='text-danger ml-4'>{ errors.files }</FormHelperText>
        }
        {
          fileErrors.map((fileError, index) => (
            <div key={index} className='text-danger'>{ fileError }</div>
          ))
        }
      </div>
      {
        !!values.files.length && (
          <div className='row mt-4'>
            {
              values.files.map((file, index) => (
                <div key={file.attachment.path} className='col'>
                  <div className={`d-flex flex-column p-1 ${classes.docPreview}`}>
                    <div className='d-flex justify-content-end mb-2'>
                      <i
                        className={`quick-search-close ki ki-close icon-sm text-muted ${classes.cursorPointer}`}
                        onClick={handleDocRemove.bind(this, index)}
                        onKeyUp={handleDocRemove.bind(this, index)}
                        role='presentation'
                      />
                    </div>
                    <img src={`${PUBLIC_URL}/media/svg/icons/Files/document.svg`} alt={file.attachment.name} />
                    <span className='text-center text-truncate'>
                      {getFileName(file.attachment.name, file.attachment.version)}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </>
  );
}

FileUploader.propTypes = { name: PropTypes.string.isRequired };
