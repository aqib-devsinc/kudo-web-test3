const urls = {
  index: '/',
  login: '/auth/login',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset/:uidb64/:token',
  logout: '/logout',
  home: '/home',
  newProject: '/home/new-project',
  projectDetails: '/home/projects/:projectId',
  updateProject: '/home/update-project/:projectId',
  detachedProjectGlossary: '/home/projects/:projectId/detached',
  auth: '/auth',
  admin: '/admin/dashboard',
  interpreter: '/admin/interpreters',
};

export default urls;
