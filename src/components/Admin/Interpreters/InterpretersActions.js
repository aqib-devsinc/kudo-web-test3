import React, { useCallback, useState } from 'react';
import { Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import IconBox from 'components/IconBox';
import PropTypes from 'prop-types';
import InterpreterToAdminConfirmationModal from './InterpreterToAdminConfirmationModal';

export default function InterpretersActions({ interpreter }) {
  const [interpretersActionsMenuAnchorEl, setInterpretersActionsMenuAnchorEl] = useState(null);
  const [assignRoles, setAssignRole] = useState('');
  const [modalOpen, setModalOpened] = useState(false);

  const handleMakeAdminAction = useCallback(() => {
    setInterpretersActionsMenuAnchorEl(null);
    setAssignRole((interpreter.roles.indexOf('admin') === -1) ? ['admin', 'interpreter'] : ['interpreter']);
    setModalOpened(true);
  }, [interpreter.roles]);

  const handleMakeAdminActionModalClose = () => {
    setModalOpened(false);
  };

  return (
    <>
      <InterpreterToAdminConfirmationModal
        open={modalOpen}
        onClose={handleMakeAdminActionModalClose}
        interpreter={interpreter}
        assignRoles={assignRoles}
      />
      <Col>
        <div className='my-3' id={`id-${interpreter.id}`}>
          <Tooltip title='Action' arrow>
            <span>
              <IconBox
                className='btn'
                type='button'
                onClick={(e) => setInterpretersActionsMenuAnchorEl(e.currentTarget)}
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
        id={`id-${interpreter.id}`}
        anchorEl={interpretersActionsMenuAnchorEl}
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
        open={Boolean(interpretersActionsMenuAnchorEl)}
        onClose={() => setInterpretersActionsMenuAnchorEl(null)}
      >
        <MenuItem
          className='pointer'
          onClick={handleMakeAdminAction}
        >
          { (interpreter.roles.indexOf('admin') === -1) ? 'Assign as Admin' : 'Un-assign as Admin'}
        </MenuItem>
      </Menu>

    </>
  );
}

InterpretersActions.propTypes = { interpreter: PropTypes.object.isRequired };
