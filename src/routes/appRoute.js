import { lazy } from 'react';
import urls from 'constants/urls';

const Login = lazy(() => import('views/Auth/Login'));
const ForgotPassword = lazy(() => import('views/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('views/Auth/ResetPassword'));
const Logout = lazy(() => import('views/Auth/Logout'));
const Home = lazy(() => import('views/Home'));
const NewProject = lazy(() => import('views/NewProject'));
const ProjectDetails = lazy(() => import('views/ProjectDetails'));
const DetachedGlossary = lazy(() => import('views/ProjectDetails/DetachedGlossary'));
const Admin = lazy(() => import('views/Admin/Dashboard'));
const Interpreter = lazy(() => import('views/Admin/Interpreters'));

const appRoutes = [
  {
    path: urls.login,
    component: Login,
    exact: true,
  },
  {
    path: urls.forgotPassword,
    component: ForgotPassword,
    exact: true,
  },
  {
    path: urls.resetPassword,
    component: ResetPassword,
    exact: true,
  },
  {
    path: urls.logout,
    component: Logout,
    exact: true,
    isAuth: true,
  },
  {
    path: urls.home,
    component: Home,
    exact: true,
    isAuth: true,
  },
  {
    path: urls.admin,
    component: Admin,
    exact: true,
    isAuth: true,
    isAdmin: true,
  },
  {
    path: urls.interpreter,
    component: Interpreter,
    exact: true,
    isAuth: true,
    isAdmin: true,
  },
  {
    path: urls.newProject,
    component: NewProject,
    exact: true,
    isAuth: true,
  },
  {
    path: urls.projectDetails,
    component: ProjectDetails,
    exact: true,
    isAuth: true,
  },
  {
    path: urls.updateProject,
    component: NewProject,
    exact: true,
    isAuth: true,
  },
  {
    path: urls.detachedProjectGlossary,
    component: DetachedGlossary,
    exact: true,
    isAuth: true,
    useLayout: false,
  },
  {
    path: urls.auth,
    to: urls.login,
    redirect: true,
  },
  {
    path: urls.index,
    to: urls.home,
    redirect: true,
  },
];

export default appRoutes;
