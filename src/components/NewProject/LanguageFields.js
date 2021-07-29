import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { MenuItem, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CustomTextField from 'components/CustomTextField';
import { PRIMARY_LANGS } from 'constants/project';
import NewProjectFormContext from 'context/newProjectForm';
import { useStyles } from 'styles/newProject';

export default function LanguageFields() {
  const { values, errors, setFieldValue } = useContext(NewProjectFormContext);
  const classes = useStyles();
  const allLanguages = useSelector(({ languages }) => languages.all);

  const handlePrimaryLangChange = ({ target: { value } }) => {
    setFieldValue('primary_language', value);
    setFieldValue('secondary_languages', values.secondary_languages.filter((lang) => lang.value !== value));
  };

  if (values.primary_language) delete errors.primary_language;

  return (
    <>
      <div className='row mt-7 mb-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='primary_language'>Source Language</label>
          <small className='d-block text-muted'>All entered info has to be in this language</small>
        </div>
        <div className='col-lg-6'>
          <CustomTextField
            select
            id='primary_language'
            name='primary_language'
            value={values.primary_language}
            onChange={handlePrimaryLangChange}
            variant='outlined'
            placeholder='Select source language'
            error={errors.primary_language}
          >
            {Object.values(PRIMARY_LANGS).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
        </div>
      </div>
      <div className='row mb-7'>
        <div className='col-lg-3'>
          <label className={`mt-2 ${classes.label}`} htmlFor='secondary_languages'>Target Languages(s)</label>
          <small className='d-block text-muted'>The terms in glossary will be translated into this language(s)</small>
        </div>
        <div className='col-lg-6'>
          <Autocomplete
            multiple
            id='secondary_languages'
            name='secondary_languages'
            options={Object.values(allLanguages)}
            filterOptions={() => Object.values(allLanguages)
              .filter((lang) => lang.value !== values.primary_language)}
            getOptionLabel={(option) => option.label}
            value={values.secondary_languages}
            onChange={(e, selectedLanguages) => {
              setFieldValue('secondary_languages', selectedLanguages);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                name='secondary_languages'
                placeholder='Select target languages(s)'
                className={`${classes.chipInput} ${classes.autocompleteInput}`}
                helperText={errors?.secondary_languages}
                error={!!errors.secondary_languages}
                size='small'
              />
            )}
          />
        </div>
      </div>
    </>
  );
}
