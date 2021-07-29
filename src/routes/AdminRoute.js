import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Layout, ContentRoute } from '_metronic/layout';
import urls from 'constants/urls';
import { ROLES } from 'constants/roles';

export default function AdminRoute({ useLayout, component: Component, ...restProps }) {
  const { isAuthenticated, isAdmin } = useSelector(({ auth }) => ({
    isAuthenticated: !!auth.token,
    isAdmin: auth.user?.roles?.includes(ROLES.admin),
  }));

  if (isAuthenticated && isAdmin && useLayout === false) {
    return <Route {...restProps}>{(routeProps) => <Component {...routeProps} />}</Route>;
  }

  if (isAuthenticated && isAdmin) {
    return (
      <Layout>
        <ContentRoute component={Component} {...restProps} />
      </Layout>
    );
  }

  if (isAuthenticated && !isAdmin) {
    return <Redirect to={urls.home} />;
  }

  return <Redirect to={urls.auth} />;
}

AdminRoute.defaultProps = {
  useLayout: null,
  restProps: {},
};

AdminRoute.propTypes = {
  useLayout: PropTypes.bool,
  component: PropTypes.objectOf().isRequired,
  restProps: PropTypes.objectOf(),
};
