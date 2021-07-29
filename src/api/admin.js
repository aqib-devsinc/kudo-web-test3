import request from './request';

export function getAdminProjects(queryParams) {
  return request(`/admin/projects?${queryParams}`);
}

export function getAdminProjectsStats() {
  return request('/admin/projects/stats');
}

export function getAdminInterpreters(queryParams) {
  return request(`/admin/interpreters?${queryParams}`);
}

export function updateUserRoles(id, roles) {
  return request(`/admin/users/${id}/roles`, {
    method: 'PATCH',
    data: { roles },
  });
}
