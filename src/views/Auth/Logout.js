import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LayoutSplashScreen } from '_metronic/layout';
import { logoutRequest } from 'redux/actions/auth';
import urls from 'constants/urls';
import WebSocketsContext from 'context/websockets';

function Logout() {
  const hasAuthToken = useSelector(({ auth }) => !!auth.token);
  const dispatch = useDispatch();
  const { wsClient, isConnected } = useContext(WebSocketsContext);

  useEffect(() => {
    dispatch(logoutRequest());
    if (isConnected) wsClient.close(1000);
  }, []);

  return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to={urls.login} />;
}

export default Logout;
