import request from './request';

export function getLanguagesRequest() {
  return request('/languages');
}
