import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import PropTypes from 'prop-types';
import { QueryParamProvider } from 'use-query-params';
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider,
  MaterialThemeProvider,
} from '_metronic/layout';
import { MetronicI18nProvider, I18nProvider } from '_metronic/i18n';
import store, { persistor } from 'redux/store';

export default function AppProviders({ children }) {
  return (
    <MetronicI18nProvider>
      <MetronicLayoutProvider>
        <MetronicSubheaderProvider>
          <MetronicSplashScreenProvider>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <BrowserRouter>
                  <QueryParamProvider ReactRouterRoute={Route}>
                    <MaterialThemeProvider>
                      <I18nProvider>
                        { children }
                      </I18nProvider>
                    </MaterialThemeProvider>
                  </QueryParamProvider>
                </BrowserRouter>
              </PersistGate>
            </Provider>
          </MetronicSplashScreenProvider>
        </MetronicSubheaderProvider>
      </MetronicLayoutProvider>
    </MetronicI18nProvider>
  );
}

AppProviders.propTypes = { children: PropTypes.node.isRequired };
