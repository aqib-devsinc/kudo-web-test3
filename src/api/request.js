import axios from 'axios';

export default function request(endpoint, opts = { method: 'GET' }) {
  return axios({
    url: endpoint,
    ...opts,
  })
    .then(({ data }) => data)
    .catch((e) => {
      if (e.response) {
        e.response.error = true;
        return e.response;
      }

      if (e.message) {
        return {
          message: e.message,
          error: true,
        };
      }

      e.error = true;
      return e;
    });
}
