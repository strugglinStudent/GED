// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Environment } from './environement.intarface';

const mobileOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
];

const url = window.location.href;
const formatUrl = new URL(url);
export const env = formatUrl.origin.includes('dev.')
  ? '.dev'
  : formatUrl.origin.includes('valid.')
    ? '.valid'
    : '';
const isMobile = mobileOrigins.includes(formatUrl.origin);
export const environment: Environment = {
  host: isMobile ? `https://ged-nova${env}.tic-nova.com` : formatUrl.origin,
  api: isMobile ? 'https://ged-nova.tic-nova.com/api' : '/api',
  // prettier-ignore
  versionSentry: 'RELEASE-SENTRY-VERSION-CI',
  // prettier-ignore
  version: 'RELEASE-APP-VERSION-CI',
  code: 'wf',
  isMobile: !formatUrl.origin.includes('localhost'),
  env: env === '.dev' ? 'DEV' : env === '.valid' ? 'VALID' : 'PROD',
  services: {},
};
