import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Switch, Redirect } from 'react-router-dom';
import appRoutes from 'routes/appRoute';
import AdminRoute from 'routes/AdminRoute';
import AuthenticatedRoute from 'routes/AuthenticatedRoute';
import UnauthenticatedRoute from 'routes/UnauthenticatedRoute';
import { LayoutSplashScreen } from '_metronic/layout';
import { getCurrentUser } from 'redux/actions/auth';
import { getLanguagesRequest } from 'redux/actions/languages';

export default function App() {
  const { hasAccessToken, isAuthenticated } = useSelector(({ auth }) => ({
    hasAccessToken: !!auth.token,
    isAuthenticated: auth.isAuthenticated,
  }));
  const dispatch = useDispatch();

  const allLanguages = useSelector(({ languages }) => languages.all);

  useEffect(() => {
    if (!allLanguages.length && isAuthenticated) dispatch(getLanguagesRequest());
  }, [isAuthenticated, allLanguages]);

  useEffect(() => {
    if (hasAccessToken) dispatch(getCurrentUser());
  }, [hasAccessToken]);

  const switchRoutes = () => appRoutes.map((route) => {
    if (route.redirect) return <Redirect key={route.path} to={route.to} from={route.path} />;

    if (route.isAdmin) return <AdminRoute key={route.path} {...route} />;

    if (route.isAuth) return <AuthenticatedRoute key={route.path} {...route} />;

    return <UnauthenticatedRoute key={route.path} {...route} />;
  });

  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          { switchRoutes() }
        </Switch>
      </Suspense>
      <ToastContainer position='top-right' autoClose={3000} />
    </>
  );
}
