import { logoutSuccess } from 'redux/actions/auth';
import { resetAppState } from 'redux/actions/app';

export default function setupAxios(axios, store) {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { token: authToken },
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `JWT ${authToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err),
  );

  axios.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response?.status === 401) {
        store.dispatch(logoutSuccess());
        store.dispatch(resetAppState());
      }

      return Promise.reject(err);
    },
  );
}
