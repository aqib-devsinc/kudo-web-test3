import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextareaAutosize, TextField, FormHelperText } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ChipInput from 'material-ui-chip-input';
import { PROJECT_TYPES } from 'constants/project';
import NewProjectFormContext from 'context/newProjectForm';
import { useStyles } from 'styles/newProject';
import CustomTextField from 'components/CustomTextField';
import LanguageFields from './LanguageFields';

const MAX_DESCRIPTION_CHARS = 500;

export default function AdditionalInfo() {
  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    activeProjectType,
  } = useContext(NewProjectFormContext);
  const classes = useStyles();
  const allLanguages = useSelector(({ languages }) => languages.all);
  const [tagsError, setTagsError] = useState('');

  const setErrorTimeout = () => {
    setTimeout(() => setTagsError(''), 3000);
  };

  const handelAddTag = (newTag) => {
    if (newTag.length > 50) {
      setTagsError('Maximum 50 characters allowed');
      setErrorTimeout();
      return;
    }

    setFieldValue('tags', [...values.tags, newTag]);
  }

  return (
    <li className={classes.step}>
      <span className={classes.step}>Provide some information</span>
      {
        activeProjectType.id !== PROJECT_TYPES.blankProject.id ? (
          <LanguageFields />
        ) : (
          <div className='row mt-7 mb-7'>
            <div className='col-lg-3'>
              <label className={`mt-2 ${classes.label}`} htmlFor='secondary_languages'>Language(s)</label>
            </div>
            <div className='col-lg-3'>
              <Autocomplete
                multiple
                id='secondary_languages'
                name='secondary_languages'
                options={Object.values(allLanguages)}
                getOptionLabel={(option) => option.label}
                value={values.secondary_languages}
                onChange={(e, selectedLanguages) => {
                  setFieldValue('secondary_languages', selectedLanguages);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='secondary_languages'
                    variant='outlined'
                    placeholder='Select language(s)'
                    className={`${classes.chipInput} ${classes.autocompleteInput}`}
                    helperText={errors?.secondary_languages}
                    error={!!errors.secondary_languages}
                    size='small'
                    fullWidth
                  />
                )}
              />
            </div>
          </div>
        )
      }
      <div className='row mb-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='description'>
            Description
          </label>
        </div>
        <div className='col-lg-4'>
          <TextareaAutosize
            id='description'
            name='description'
            className={`${classes.description} ${errors.description ? classes.errorBorder : ''} p-4`}
            placeholder='Describe the glossary(optional)'
            value={values.description}
            onChange={handleChange}
            variant='outlined'
            rowsMin={3}
            maxLength={MAX_DESCRIPTION_CHARS}
            fullWidth={false}
          />
          {
            errors.description && <FormHelperText className='text-danger ml-4'>{errors.description}</FormHelperText>
          }
        </div>
        <div className='col'>
          <p className='mt-2 font-weight-normal'>
            {MAX_DESCRIPTION_CHARS - values.description.length}
            {' '}
            Characters left
          </p>
        </div>
      </div>
      <div className='row mb-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='tags'>
            Tags
          </label>
        </div>
        <div className='col-lg-6'>
          <ChipInput
            id='tags'
            name='tags'
            value={values.tags}
            placeholder='Type and enter some Tags(optional)'
            variant='outlined'
            className={classes.chipInput}
            onAdd={(newTag) => handelAddTag(newTag)}
            onDelete={(deletedTag) => setFieldValue(
              'tags', values.tags.filter((tag) => tag !== deletedTag),
            )}
            helperText={errors.tag}
            error={!!errors.tag || !!tagsError}
            fullWidth
          />
          <div className='col-12'>
            <small key={tagsError} className='text-danger'>{ tagsError }</small>
          </div>
        </div>
      </div>
      <div className='row mb-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='client'>
            Client
          </label>
        </div>
        <div className='col-lg-6'>
          <CustomTextField
            id='client'
            name='client'
            className={classes.name}
            placeholder='Enter client(optional)'
            value={values.client}
            variant='outlined'
            onChange={handleChange}
            inputProps={{ style: { backgroundColor: '#F3F6F9' } }}
            error={!!errors.client}
            size='small'
            fullWidth
          />
          {
            errors.client
            && <FormHelperText className='text-danger ml-4'>{errors.client}</FormHelperText>
          }
        </div>
      </div>
      <div className='row mb-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='subject_matter'>Subject Matter</label>
        </div>
        <div className='col-lg-6'>
          <CustomTextField
            id='subject_matter'
            name='subject_matter'
            className={classes.name}
            placeholder='Enter Subject matter'
            value={values.subject_matter}
            variant='outlined'
            onChange={handleChange}
            inputProps={{ style: { backgroundColor: '#F3F6F9' } }}
            error={!!errors.subject_matter}
            size='small'
            fullWidth
          />
          {
            errors.subject_matter
            && <FormHelperText className='text-danger ml-4'>{errors.subject_matter}</FormHelperText>
          }
        </div>
      </div>
      <hr className='col-lg-12 mt-7 mb-7' />
    </li>
  );
}
