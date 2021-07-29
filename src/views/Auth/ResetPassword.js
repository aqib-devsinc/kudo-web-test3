import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

const LinkButtons = ({ buttonText, link }) => (
  <>
    <Link style={linkStyle} to={link}>
      <button
        type='button'
        id='kt_login_forgot_cancel'
        className='btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4'
      >
        {buttonText}
      </button>
    </Link>
  </>
);

LinkButtons.propTypes = {
  buttonText: PropTypes.string,
  link: PropTypes.string,
};

LinkButtons.defaultProps = {
  link: '/',
  buttonText: 'Default Button Text',
};

const updateButton = {
  background: '',
  padding: '1em',
  margin: '1em',
};

const homeButton = {
  background: 'white',
  padding: '1em',
  margin: '1em',
};

const loginButton = {
  background: 'royalblue',
  padding: '1em',
  margin: '1em',
};

const forgotButton = {
  background: 'purple',
  padding: '1em',
  margin: '1em',
};

const PageHeader = () => (
  <div className='login-form login-forgot' style={{ display: 'block' }}>
    <div className='text-center mb-10 mb-lg-20'>
      <h2 className='font-size-h1'>Reset Password </h2>
      <div className='text-muted font-weight-bold'>
        Enter Info to reset your password
      </div>
    </div>
  </div>
);
const SubmitButtons = ({ buttonText }) => (
  <button
    id='kt_login_forgot_submit'
    type='submit'
    className='btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4'
  >
    {buttonText}
  </button>
);

SubmitButtons.propTypes = { buttonText: PropTypes.string.isRequired };

const loading = {
  margin: '1em',
  fontSize: '24px',
};

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      uidb64: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
      error_messages: '',
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { uidb64, token },
      },
    } = this.props;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/reset_password/${uidb64}/${token}`,
      );
      if (response.status === 200) {
        this.setState({
          uidb64,
          token,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (err) {
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { uidb64, password, token } = this.state;
    try {
      const response = await axios.put(
        'http://localhost:8000/api/reset_password',
        {
          uidb64,
          password,
          token,
        },
      );
      if (response.status === 200) {
        this.setState({
          uidb64: '',
          token: '',
          password: '',
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
      this.setState({ error_messages: '' });
    } catch (err) {
      this.setState({ error_messages: err.response.data['validation errors'] });
    }
  };

  render() {
    const { password, error, isLoading, updated, error_messages } = this.state;

    if (error) {
      return (
        <div>
          <PageHeader />
          <div className='text-center' style={loading}>
            <h3>
              <p>Problem resetting password,</p>
              <p>Please send another reset link.</p>
            </h3>
            <LinkButtons
              buttonText='Go Home'
              buttonStyle={homeButton}
              link='/'
            />
            <LinkButtons
              buttonStyle={forgotButton}
              buttonText='Forgot Password?'
              link='/auth/forgot-password'
            />
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <h3 className='font-size-h1'>Reset Password </h3>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        <PageHeader />
        {error_messages && (
          <div>
            <ul>
              {error_messages.map((errorMsg) => (
                <li>
                  <p className='text-break'>{errorMsg}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!updated && (
          <form className='password-form' onSubmit={this.updatePassword}>
            <div className='form-group fv-plugins-icon-container'>
              <input
                id='password'
                type='password'
                label='password'
                onChange={this.handleChange('password')}
                className='form-control form-control-solid h-auto py-5 px-6'
                value={password}
              />
            </div>

            <SubmitButtons
              buttonStyle={updateButton}
              buttonText='Update Password'
            />
            <LinkButtons buttonText='Go Home' link='/' />
          </form>
        )}

        {updated && (
          <div className='text-center'>
            <p>Your password has been successfully reset</p>
            <p> please try logging in again.</p>
            <LinkButtons
              buttonStyle={loginButton}
              buttonText='Login'
              link='/login'
            />
          </div>
        )}
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
      uidb64: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
