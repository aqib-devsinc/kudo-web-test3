import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { login } from 'api/auth';
import { Checkbox } from '_metronic/_partials/controls/forms/Checkbox';
import Toaster from '_metronic/_partials/controls/Toaster';
import { login as loginAction } from 'redux/actions/auth';
import CustomTextField from 'components/CustomTextField';
import { InputAdornment, colors } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { useStyles } from 'styles/auth';

const initialValues = {
  email: '',
  password: '',
};

const { red, green } = colors;

function Login() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const intl = useIntl();
  const classes = useStyles();

  const errorDiv = error ? (
    <div className='error mb-1 d-flex'>
      <i className='material-icons error-icon mr-1' style={{ color: red[500] }}>error_outline</i>
      <div className='mb-1'>{error.charAt(0).toUpperCase() + error.slice(1)}</div>
    </div>
  ) : null;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(100, 'Maximum 100 symbols')
      .required(
        intl.formatMessage({ id: 'AUTH.VALIDATION.REQUIRED_FIELD' }),
      ),
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({ id: 'AUTH.VALIDATION.REQUIRED_FIELD' }),
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      login(values.email, values.password)
        .then(({ data }) => {
          dispatch(loginAction(data));
          Toaster('success', 'You are successfuly logged in!');
        })
        .catch((err) => {
          setSubmitting(false);

          if (err.response?.status === 401 || err.response?.status === 400) {
            setError(err.response.data.message.toString());
            setStatus(
              intl.formatMessage({ id: 'AUTH.VALIDATION.INVALID_LOGIN' }),
            );
          }
        });
    },
  });

  const { errors, touched } = formik;

  const getValidationIcon = (fieldname) => {
    if (touched[fieldname] && errors[fieldname]) {
      return (
        <i className='material-icons error-icon mr-1' style={{ color: red[500] }}>error_outline</i>
      );
    }

    if (touched[fieldname] && !errors[fieldname]) {
      return (
        <CheckIcon style={{ color: green[500] }} />
      );
    }

    return '';
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='card col-md-5'>
          <>
            <div className='d-flex align-items-center justify-content-center mb-10 mt-10'>
              <img
                src={`${process.env.PUBLIC_URL}/media/logos/KUDO_logo.png`}
                alt='logo'
              />
              <p className={`mb-0 ml-4 ${classes.heading}`}>
                <span className='d-block'>Interpreter</span>
                <span className='d-block'>Assist</span>
              </p>
            </div>
            <p className={`signin-text text-center mb-10 ${classes.silentText}`}>Sign in with your Kudo Account</p>
            <div className='d-flex align-items-center justify-content-center' style={{ color: 'red' }}>{errorDiv}</div>
          </>

          <form
            onSubmit={formik.handleSubmit}
            className='form mx-10 fv-plugins-bootstrap fv-plugins-framework'
          >
            <label className='ml-2' htmlFor='email'>Email:</label>
            <CustomTextField
              id='login-email-input'
              name='email'
              className={`py-5 ${classes.input}`}
              placeholder='email'
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {getValidationIcon('email')}
                  </InputAdornment>
                ),
              }}
              error={errors.email}
              fullWidth
              {...formik.getFieldProps('email')}
            />
            <label className='ml-2' htmlFor='password'>Password:</label>
            <CustomTextField
              id='login-password-input'
              name='password'
              className={`py-5 ${classes.input}`}
              placeholder='password'
              variant='outlined'
              type='password'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {getValidationIcon('password')}
                  </InputAdornment>
                ),
              }}
              error={errors.password}
              fullWidth
              {...formik.getFieldProps('password')}
            />
            <div>
              <div className='float-left'>
                <Checkbox>
                  <span className='mr-1' />
                  Remember me
                </Checkbox>
              </div>

              <div className='checkbox float-right'>
                <Link to='/auth/forgot-password'>
                  <FormattedMessage id='AUTH.GENERAL.FORGOT_BUTTON' />
                </Link>
              </div>
            </div>
            <div className='form-group text-center'>
              <button
                id='kt_login_signin_submit'
                type='submit'
                disabled={formik.isSubmitting}
                className='btn btn-primary px-9 py-4 my-3 mt-10'
              >
                <span>Sign in</span>
                {formik.isSubmitting && <span className='ml-2 spinner spinner-white' />}
              </button>
            </div>
            {/* <div className='form-group text-center'>
              <p className='text-muted mt-10'>
                Not a member yet?
                <a href='/' className='ml-2'>Sign up</a>
              </p>
            </div> */}
          </form>
        </div>
      </div>
      <footer className='fixed-bottom page-footer font-small blue'>
        <div className={`footer-copyright d-flex align-items-center justify-content-center py-3 ${classes.silentText}`}>
          <span className={`text-white ${classes.lineSeparator}`}>
            <span>&#169; </span>
            KUDO, Inc, 2021. All rights reserved. v
            &nbsp;
            { process.env.REACT_APP_VERSION }
          </span>
          <a
            href='https://kudoway.com/contact/'
            className='text-white d-block ml-4'
            target='_blank'
            rel='noreferrer'
          >
            Contact us
          </a>
          <a
            href='https://kudoway.com/terms-of-use/'
            className='text-white d-block ml-10'
            target='_blank'
            rel='noreferrer'
          >
            Terms
          </a>
          <a
            href='https://kudoway.com/privacy-policy/'
            className='text-white d-block ml-10'
            target='_blank'
            rel='noreferrer'
          >
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
