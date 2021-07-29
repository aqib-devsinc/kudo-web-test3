import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const SocketsContext = React.createContext({});

export default SocketsContext;

export const WebSocketsContext = ({ children }) => {
  let token = useSelector(({ auth }) => auth.token);
  const [isConnected, setConnected] = useState(false);

  let client = {};

  if (token) {
    token = window.btoa(token);

    client = new WebSocket(`${process.env.REACT_APP_SOCKETS_BASE_URL}/${token}`);

    client.onerror = function (error) {
      console.log('Connection Error', error);
    };

    client.onopen = function () {
      console.log('WebSocket Client Connected');
      setConnected(true);
    };

    client.onclose = function (error) {
      console.log('echo-protocol Client Closed', error);
      setConnected(false);
    };

    client.onmessage = function (e) {
      console.log(`Received: '${e.data}'`);
    };
  }

  return (
    <SocketsContext.Provider
      value={{
        wsClient: client,
        isConnected,
      }}
    >
      { children }
    </SocketsContext.Provider>
  );
}

WebSocketsContext.propTypes = { children: PropTypes.node.isRequired };
