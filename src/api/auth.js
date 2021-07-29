import axios from 'axios';
import request from './request';

export function login(email, password) {
  return axios.post('/login', {
    email,
    password,
  });
}

export function logout() {
  return axios.post('/logout');
}

export function register(email, fullname, username, password) {
  return axios.post('/auth/register', {
    email,
    fullname,
    username,
    password,
  });
}

export function requestPassword(email) {
  return axios.post('/reset_password', { email });
}

export function getCurrentUser() {
  return request('/me');
}
