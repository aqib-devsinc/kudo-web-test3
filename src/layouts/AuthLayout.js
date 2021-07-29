import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from 'styles/auth';
import '_metronic/_assets/sass/pages/login/classic/login-1.scss';

const { PUBLIC_URL } = process.env;

export default function AuthLayout({ children }) {
  const classes = useStyles();
  return (
    <div className='d-flex flex-column flex-root main-class'>
      <div
        // eslint-disable-next-line max-len
        className={`login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white ${classes.backgroundImage}}`}
        id='kt_login'
        style={{
          background: `url(${PUBLIC_URL}/media/bg/login-background-2.gif) no-repeat center center fixed`,
          webkitBackgroundSize: 'cover',
          mozBackgroundSize: 'cover',
          oBackgroundSize: 'cover',
          backgroundSize: 'cover',
        }}
      >
        <div className='flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden'>
          <div className='d-flex flex-column-fluid flex-center mt-30 mt-lg-0'>
            { children }
          </div>
        </div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = { children: PropTypes.node.isRequired };
