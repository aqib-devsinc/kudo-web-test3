import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Layout, ContentRoute } from '_metronic/layout';
import urls from 'constants/urls';

export default function AuthenticatedRoute({ useLayout, component: Component, ...restProps }) {
  const isAuthenticated = useSelector(({ auth }) => !!auth.token);

  if (isAuthenticated && useLayout === false) {
    return <Route {...restProps}>{(routeProps) => <Component {...routeProps} />}</Route>;
  }

  if (isAuthenticated) {
    return (
      <Layout>
        <ContentRoute component={Component} {...restProps} />
      </Layout>
    );
  }

  return <Redirect to={urls.auth} />;
}

AuthenticatedRoute.defaultProps = {
  useLayout: null,
  restProps: {},
};

AuthenticatedRoute.propTypes = {
  useLayout: PropTypes.bool,
  component: PropTypes.objectOf().isRequired,
  restProps: PropTypes.objectOf(),
};
