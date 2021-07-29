import React, { useCallback } from 'react';
import {
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal';

export default function FileViewerModal({ open, onClose, file }) {
  const getFilePreview = useCallback(() => {
    if (file?.metadata?.name?.split('.')?.pop() === 'wav') {
      return (
        <audio
          width='600'
          height='500'
          src={`${file.url}`}
          type='audio/wav'
          controls
        >
          <track kind='captions' />
        </audio>
      )
    }

    if (file?.metadata?.name?.split('.')?.pop() === 'mp4') {
      return (
        <video
          width='550'
          height='400'
          src={`${file.url}`}
          type='video/mp4'
          controls
        >
          <track kind='captions' />
        </video>
      )
    }

    if (file?.metadata?.name?.split('.')?.pop() === 'ppt'
        || file?.metadata?.name?.split('.')?.pop() === 'pptx'
        || file?.metadata?.name?.split('.')?.pop() === 'docx'
        || file?.metadata?.name?.split('.')?.pop() === 'doc'
        || file?.metadata?.name?.split('.')?.pop() === 'odt'
        || file?.metadata?.name?.split('.')?.pop() === 'txt'
        || file?.metadata?.name?.split('.')?.pop() === 'pdf'
    ) {
      const docs = [{
        uri: file.url,
        fileType: file?.metadata?.name?.split('.')?.pop() === 'odt'
          ? 'doc'
          : file?.metadata?.name?.split('.')?.pop(),
      }];
      return (
        <DocViewer
          style={{
            width: '600px',
            minHeight: '500px',
          }}
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: true,
            },
          }}
        />
      )
    }

    console.clear();

    return (
      <p>
        The file type&nbsp;
        <b>
          { file?.metadata?.name?.split('.')?.pop() }
        </b>
        &nbsp;is not supported
      </p>
    )
  }, [file]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      aria-labelledby='project-delete-dialog'
      maxWidth='lg'
    >
      <div className=''>
        <DialogContent>
          {getFilePreview()}
        </DialogContent>
        <hr />
        <DialogActions>
          <button className='btn btn-primary py-2 px-6 mr-4' onClick={onClose} type='button'>Close</button>
        </DialogActions>
      </div>
    </CustomModal>
  );
}

FileViewerModal.defaultProps = { file: {} };

FileViewerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  file: PropTypes.objectOf({
    name: PropTypes.string,
    corpusLink: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
