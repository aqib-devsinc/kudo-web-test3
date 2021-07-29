import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import { toAbsoluteUrl } from '_metronic/_helpers';
import urls from 'constants/urls';
import { ROLES } from 'constants/roles';
import { getCurrentUrl } from "../../../../_helpers";

const useStyles = makeStyles((theme) => ({
  cursorPointer: {
    cursor: 'pointer',
  },
  profileImg: {
    width: '100%',
    borderRadius: '10px',
  },
  profileWrapper: {
    width: theme.spacing(50),
    height: '100%',
  },
  divider: {
    border: 'dotted 1px',
  },
}));

export function UserProfileDropdown() {
  const { isAdmin, aLanguages, bLanguages, cLanguages, signLanguages } = useSelector(({ auth }) => ({
    isAdmin: auth.user?.roles?.includes(ROLES.admin),
    interpreter_details: auth.user?.interpreter_details,
    aLanguages: eval(auth.user?.interpreter_details?.languages_a),
    bLanguages: eval(auth.user?.interpreter_details?.languages_b),
    cLanguages: eval(auth.user?.interpreter_details?.languages_c),
    signLanguages: auth.user?.interpreter_details?.sign_languages,
  }));
  const location = useLocation();
  const currentLocation = getCurrentUrl(location);
  const { user } = useSelector((state) => state.auth);
  const [showProfile, setShowProfile] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  if (!user) return null;

  const handleToggleProfile = () => {
    setShowProfile(!showProfile);
  }

  useEffect(() => {
    if (isAdmin && [urls.admin, urls.interpreter].includes(currentLocation)) setIsAdminView(true);

  }, [currentLocation]);

  return (
    <>
      <div className='d-flex align-items-center'>
        <div
          className='btn btn-icon d-flex align-items-center btn-lg px-md-2 w-md-auto'
          onClick={handleToggleProfile}
        >
          <span className='text-black opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1'>
            Hi,
          </span>
          <span className='text-black opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4'>
            {user.full_name}
          </span>
          <span className='symbol symbol-35 bg-primary'>
            <span className='symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30'>
              {user.full_name?.[0]}
            </span>
          </span>
        </div>
      </div>
      <Drawer anchor='right' open={showProfile} onClose={handleToggleProfile}>
        <div className={classes.profileWrapper}>
          <div className='p-10'>
            <div className='d-flex justify-content-between mb-4'>
              <h3>User Profile</h3>
              <i
                className={`quick-search-close ki ki-close icon-sm text-muted ${classes.cursorPointer}`}
                onClick={handleToggleProfile}
              />
            </div>
            <div className='row mb-10'>
              <div className='col-lg-3'>
                <img src='/media/svg/avatars/user.svg' alt={user.full_name} className={classes.profileImg} />
              </div>
              <div className='col'>
                <h4 className='font-weight-normal mb-3'>{ user.full_name }</h4>
                <span className='d-block text-muted'>Interpreter</span>
                <div className='d-flex mb-4'>
                  <img src='/media/svg/icons/Files/email.svg' alt='email' />
                  <span className='text-muted'>{user.email}</span>
                </div>
                <Link to={urls.logout}>
                  <button className='btn btn-light-primary font-weight-bold'>Sign Out</button>
                </Link>
                <div>
                  {
                    isAdmin &&
                      <Link to={isAdminView ? urls.home : urls.admin}>
                        <button
                          className='mt-2 btn btn-light-danger font-weight-bold'
                        >
                          Switch to {isAdminView ? 'Interpreter' : 'Admin'}
                        </button>
                      </Link>
                  }
                </div>
              </div>
            </div>
            <hr className={`mb-10 ${classes.divider}`} />
            <h3 className='mb-10'>Languages</h3>
            <Language language={{ class: 'A Languages', names: aLanguages}} />
            <Language language={{ class: 'B Languages', names: bLanguages}} />
            <Language language={{ class: 'C Languages', names: cLanguages}} />
            <div className='mt-4'>
              <Language language={{ class: 'Sign Languages', names: signLanguages === 'None' ?  ['-'] : eval(signLanguages) }} />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

function Language({language}) {
  return (
    <div className='row'>
      <div className='col'>
        <h6>{language.class}</h6>
      </div>
      <div className='col'>
        <span>{language?.names?.join(', ') || '-'}</span>
      </div>
    </div>
  )
}
