import axios from 'axios';
import request from './request';

export function createProject(data) {
  return axios.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export function getProjects(queryParams) {
  return request(`/projects?${queryParams}`);
}

export function searchProjects(queryParams, cancelToken) {
  return request(`/projects?${queryParams}`, {
    method: 'GET',
    cancelToken: cancelToken.token,
  });
}

export function deleteProject(id) {
  return request(`/projects/${id}`, { method: 'DELETE' });
}

export function deleteProjectFile(id, fileId) {
  return request(`/projects/${id}/file/${fileId}`, { method: 'DELETE' });
}

export function getProject(id) {
  return request(`/projects/${id}`);
}

export function updateProject(id, data) {
  return axios.patch(`/projects/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export function getProjectGlossary({
  id,
  queryParams,
  cancelToken,
}) {
  return request(`/projects/${id}/glossary?${queryParams}`, {
    method: 'GET',
    cancelToken: cancelToken.token,
  });
}

export function getMergedTableGlossary({
  id,
  queryParams,
  mergeGlossaryTableName,
  cancelToken,
}) {
  return request(`/projects/${id}/merged-glossaries?name=${mergeGlossaryTableName}&${queryParams}`, {
    method: 'GET',
    cancelToken: cancelToken.token,
  });
}

export function addTerm(projectId, data) {
  return request(`/projects/${projectId}/glossary`, {
    method: 'POST',
    data,
  });
}

export function updateTerm(projectId, data) {
  return request(`/projects/${projectId}/glossary`, {
    method: 'PATCH',
    data,
  });
}

export function deleteTerms(projectId, termIds) {
  return request(
    `/projects/${projectId}/glossary?${termIds.map((termId) => `id[]=${termId}&`).join('')}`,
    { method: 'DELETE' },
  );
}

export function exportGlossary(projectId, queryParams) {
  return request(`/projects/${projectId}/glossary/export?${queryParams}`);
}

export function saveMergedGlossary({
  projectId,
  mergedProjectIds,
  data,
}) {
  return request(
    `/projects/${projectId}/merged-glossaries?${mergedProjectIds
      .map((mergedProjectId) => `id[]=${mergedProjectId}`)
      .join('&')}`,
    {
      method: 'POST',
      data,
    },
  );
}

export function getEntities(projectId) {
  return request(`projects/${projectId}/entities`);
}

export function deleteEntity(projectId, entityId) {
  return request(`projects/${projectId}/entities?id=${entityId}`, { method: 'DELETE' });
}

export function getGlossaryStats(projectId) {
  return request(`projects/${projectId}/glossary/stats`);
}
