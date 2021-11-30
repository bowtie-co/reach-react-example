import Api from '@bowtie/api';
import { storage } from './storage';

const {
  REACT_APP_API_ROOT = 'http://localhost:4000',
  // REACT_APP_API_STAGE = 'dev',
  // REACT_APP_API_PREFIX = 'api',
  // REACT_APP_API_VERSION = 'v1',
} = process.env;

const api = new Api({
  root: REACT_APP_API_ROOT,
  // stage: REACT_APP_API_STAGE,
  // prefix: REACT_APP_API_PREFIX,
  // version: REACT_APP_API_VERSION,
  verbose: process.env.REACT_APP_ENV !== 'production' && process.env.REACT_APP_ENV !== 'test',
  secureOnly: process.env.REACT_APP_ENV === 'production',
  authorization: 'Bearer'
});

api.authorize({
  token: () => storage.get('token')
});

api.on(401, (resp) => {
  console.debug('401 Response', resp);
  // storage.clear();

  // window.location.reload();
});

api.use(async (response) => {
  try {
    response.data = await response.json();
  } catch (e) {
    console.warn('Failed to parse response JSON', e);
  }

  return Promise.resolve(response);
});

export { api };
