import React from 'react';
import { useStyles } from 'styles/newProject';
import AdditionalInfo from './AdditionalInfo';
import ShareType from './ShareType';
import FileUploader from './FileUploader';

export default function UploadDocs() {
  const classes = useStyles();

  return (
    <>
      <AdditionalInfo />
      <ShareType />
      <li className={classes.step}>
        <span className={classes.step}>Upload Documents</span>
        <div className='row mt-7'>
          <FileUploader name='files' />
        </div>
        <hr className='col-lg-12 mt-7 mb-7' />
      </li>
    </>
  );
}
