import React, { memo } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import Editable from 'components/Editable';
import { useStyles } from 'styles/projectDetails';

function TerminologyDetailAttribute({
  label,
  value,
  definition,
  creator,
  editor,
  status,
  isEditing,
  cycle_id,
  onChange,
  created_at,
  updated_at,
  focused,
}) {
  const classes = useStyles();

  return (
    <Row noGutters>
      <Col className={`col-3 d-flex ${classes.cellBorder}`}>
        <Col className='d-flex justify-content-end'>
          {
            definition && (
              <Tooltip
                title={(
                  <>
                    <div className='mb-1'>
                      <span>Created by:&nbsp;</span>
                      <span>{ creator?.full_name }</span>
                    </div>
                    <div className='mb-1'>
                      <span>Last Updated by:&nbsp;</span>
                      <span className='m-0'>{ editor ? editor.full_name : '-' }</span>
                    </div>
                    <div className='mb-1'>
                      <span>Creation date:&nbsp;</span>
                      <span>{ moment(created_at).format('DD-MM-YYYY') }</span>
                    </div>
                    <div className='mb-1'>
                      <span>Last updated date:&nbsp;</span>
                      <span className='m-0'>{ moment(updated_at).format('DD-MM-YYYY') }</span>
                    </div>
                    <div>
                      <span>Cycle id:&nbsp;</span>
                      <span>{ cycle_id }</span>
                    </div>
                  </>
                )}
                arrow
              >
                <div className='h-50'>
                  <SVG src='/media/svg/icons/General/Info-circle.svg' className='pointer' />
                </div>
              </Tooltip>
            )
          }
        </Col>
        <Col className='col-8 d-flex justify-content-start'>
          <p className='m-0 font-bold h-6'>{ label }</p>
        </Col>
      </Col>
      <Col>
        <p className={`m-0 ml-4 pb-4 ${status ? 'primary font-weight-bold text-uppercase' : ''}`}>
          <Editable text={value} canEdit={isEditing} onDone={onChange} focused={focused} />
        </p>
      </Col>
    </Row>
  );
}

TerminologyDetailAttribute.defaultProps = {
  value: null,
  definition: false,
  editor: null,
  status: false,
  isEditing: false,
  cycle_id: null,
  onChange: null,
  creator: null,
};

TerminologyDetailAttribute.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  definition: PropTypes.bool,
  status: PropTypes.bool,
  editor: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
  }),
  creator: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
  }),
  isEditing: PropTypes.bool,
  cycle_id: PropTypes.number,
  onChange: PropTypes.func,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default memo(TerminologyDetailAttribute);
