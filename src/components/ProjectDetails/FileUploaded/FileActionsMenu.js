import React, { useCallback, useState } from 'react';
import { Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import IconBox from 'components/IconBox';
import { FILE_DETAIL_ACTIONS_TYPES } from 'constants/projectDetails';
import PropTypes from 'prop-types';

export default function FileActionsMenu({
  file,
  handleViewFileDetails,
  setSelectedFile,
  setDeleteConfirmationModalOpened,
}) {
  const [fileActionsMenuAnchorEl, setFileActionsMenuAnchorEl] = useState(null);

  const handleDeleteFile = useCallback(() => {
    setSelectedFile({
      name: file.metadata.name,
      id: file.id,
    });
    setDeleteConfirmationModalOpened(true);
  });

  return (
    <>
      <Col>
        <div className='text-right' id={`id-${file.id}`}>
          <Tooltip title='Action' arrow>
            <span>
              <IconBox
                className='btn'
                type='button'
                onClick={(e) => setFileActionsMenuAnchorEl(e.currentTarget)}
              >
                <SVG
                  src='/media/svg/icons/Files/file-dropdown.svg'
                  className='pointer'
                />
              </IconBox>
            </span>
          </Tooltip>
        </div>
      </Col>
      <Menu
        id={`id-${file.id}`}
        anchorEl={fileActionsMenuAnchorEl}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(fileActionsMenuAnchorEl)}
        onClose={() => setFileActionsMenuAnchorEl(null)}
      >
        {/* <MenuItem
          className='pointer'
          onClick={
            handleViewFileDetails.bind(this, file,
            `${FILE_DETAIL_ACTIONS_TYPES.summary.value}`)
          }
          disabled
        >
          Summary
        </MenuItem>
        <MenuItem
          className='pointer'
          onClick={
            handleViewFileDetails.bind(this, file,
            `${FILE_DETAIL_ACTIONS_TYPES.corpus.value}`)
          }
          disabled
        >
          Translation
        </MenuItem> */}
        <MenuItem>
          <a href={file.url} target='_blank' rel='noreferrer'>Download</a>
        </MenuItem>
        <MenuItem
          className='pointer text-danger'
          onClick={handleDeleteFile.bind(this, file)}
        >
          Delete
        </MenuItem>
      </Menu>

    </>
  );
}

FileActionsMenu.propTypes = {
  file: PropTypes.object.isRequired,
  handleViewFileDetails: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  setDeleteConfirmationModalOpened: PropTypes.func.isRequired,
};
