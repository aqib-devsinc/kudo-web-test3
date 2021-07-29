import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ContentRoute } from '_metronic/layout';
import AuthLayout from 'layouts/AuthLayout';
import urls from 'constants/urls';
import { ROLES } from 'constants/roles';

export default function UnauthenticatedRoute(props) {
  const { isAuthenticated, isAdmin } = useSelector(({ auth }) => ({
    isAuthenticated: !!auth.token,
    isAdmin: auth.user?.roles?.includes(ROLES.admin),
  }));

  if (!isAuthenticated) {
    return (
      <AuthLayout>
        <ContentRoute {...props} />
      </AuthLayout>
    )
  } if (isAuthenticated && isAdmin) {
    return <Redirect to={urls.admin} />
  }

  return <Redirect to={urls.index} />
}
