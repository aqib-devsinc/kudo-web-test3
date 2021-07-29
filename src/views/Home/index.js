import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import HomeHeader from 'components/Home/HomeHeader';
import HomeBody from 'components/Home/HomeBody';
import { getLanguagesRequest } from 'redux/actions/languages';

export default function HomeMain() {
  const dispatch = useDispatch();

  const allLanguages = useSelector(({ languages }) => languages.all);

  useEffect(() => {
    if (!allLanguages.length) dispatch(getLanguagesRequest());
  }, []);
  return (
    <div className='row'>
      <div className='col-xl-12 pX-0'>
        <HomeBody className='col-lg-12' />
      </div>
    </div>
  );
}
