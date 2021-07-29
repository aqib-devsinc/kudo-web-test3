import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { MenuItem, TextareaAutosize } from '@material-ui/core';
import CustomTextField from 'components/CustomTextField';
import { useStyles } from 'styles/projectDetails';
import { getLangLabel } from 'helpers/languages';
import { useParams } from 'react-router-dom';
import { showToast } from 'redux/actions/toast';

export default function AddTerm({ term, onUpdateTerm }) {
  const [file, setFile] = useState(null);
  const [corpus, setCorpus] = useState('');
  const { project, glossary } = useSelector(({ projects }) => ({
    project: projects.current,
    glossary: projects.glossary,
  }));
  const classes = useStyles();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!file?.id) return;

    axios.get(`projects/${projectId}/file/${file.id}/corpus`)
      .then(({ data }) => {
        setCorpus(window.atob(data));
      })
      .catch(() => dispatch(showToast({
        type: 'error',
        message: 'Failed to fetch file corpus',
      })));
  }, [file]);

  const handleFileChange = ({ target: { value } }) => {
    const selectedFile = project.files.find((projectFile) => projectFile.id === value);
    setFile(selectedFile);
    onUpdateTerm('language', selectedFile?.metadata?.language || project.primary_language);
  };

  const handleTextSelection = ({ target: activeEl }) => {
    const text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);

    if (!text) return;

    onUpdateTerm('value', text);
  };

  const handleSelectedTextChange = ({ target: { value } }) => {
    onUpdateTerm('value', value);
  };

  const truncateFileName = (fileName) => {
    if (fileName.length < 40) return fileName;

    fileName = `${fileName.substring(0, 30)}...${fileName.substring(fileName.length - 6)}`;
    return fileName;
  };

  const getFileInputLabel = (metadata) => {
    if (!metadata) return '';

    return `${truncateFileName(metadata.name)}
      ${metadata.version ? `-${metadata.version}` : ''}
      (${metadata.language
      ? getLangLabel(metadata.language, glossary.languages)
      : getLangLabel(project.primary_language, glossary.languages)})`;
  };

  const clearCorpus = () => {
    setFile(null);
    setCorpus('');
  }

  return (
    <>
      <CustomTextField
        name='term'
        value={term}
        onChange={handleSelectedTextChange}
        className='btn btn-default text-muted mb-4'
        placeholder='Edit selected text before move it to the glossary'
        variant='outlined'
        size='small'
        disabled={!term}
        fullWidth
      >
        Edit selected text before move it to the glossary
      </CustomTextField>
      <TextareaAutosize
        name='description'
        value={corpus}
        onSelect={handleTextSelection}
        rowsMax={1}
        className={`d-flex justify-content-center align-items-center mb-4 w-100
          ${classes.addTermWrapper}`}
        placeholder='the textual content of the file
              will be displayed here'
        variant='outlined'
      />
      <CustomTextField
        name='file'
        placeholder='Select Document'
        value={file?.id ?? ''}
        onChange={handleFileChange}
        variant='outlined'
        fullWidth
        select
      >
        {project.files.map((projectFile) => (
          <MenuItem key={projectFile.id} value={projectFile.id}>
            { getFileInputLabel(projectFile.metadata) }
          </MenuItem>
        ))}
      </CustomTextField>
    </>
  );
}

AddTerm.propTypes = {
  term: PropTypes.string.isRequired,
  onUpdateTerm: PropTypes.func.isRequired,
};
