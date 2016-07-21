const nconf = require('nconf');

const environment = process.env.NODE_ENV || 'default';

nconf
  .argv()
  .env('env')
  .file('env-overrides', `${__dirname}/environments/${environment}.json`)
  .file('env-defaults', `${__dirname}/environments/default.json`);

export default nconf;
