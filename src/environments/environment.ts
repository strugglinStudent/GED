import { Environment } from './environement.intarface';

const url = window.location.href;
const formatUrl = new URL(url);
export const env = '';

export const environment: Environment = {
  host: formatUrl.origin,
  api: 'http://localhost:8290/api',
  isMobile: !formatUrl.origin.includes('localhost'),
  code: 'get',
  env: 'LOCAL',
  versionSentry: 'ged-nova@0.0.0',
  version: '0.0.0',
  services: {},
};
