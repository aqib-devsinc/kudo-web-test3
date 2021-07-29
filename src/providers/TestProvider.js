/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import { MetronicI18nProvider, I18nProvider } from '_metronic/i18n';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { QueryParamProvider } from 'use-query-params';
import testStore from 'fixtures/testStore';
import { MetronicLayoutProvider, MetronicSubheaderProvider, MaterialThemeProvider } from '_metronic/layout';
import { WebSocketsContext } from 'context/websockets';

export default function TestProvider({ children }) {
  return (
    <MetronicI18nProvider>
      <Provider store={testStore}>
        <WebSocketsContext>
          <MetronicLayoutProvider>
            <MetronicSubheaderProvider>
              <MaterialThemeProvider>
                <I18nProvider>
                  <BrowserRouter>
                    <QueryParamProvider ReactRouterRoute={Route}>
                      { children }
                    </QueryParamProvider>
                  </BrowserRouter>
                </I18nProvider>
              </MaterialThemeProvider>
            </MetronicSubheaderProvider>
          </MetronicLayoutProvider>
        </WebSocketsContext>
      </Provider>
    </MetronicI18nProvider>
  );
}

TestProvider.propTypes = { children: PropTypes.node.isRequired };
