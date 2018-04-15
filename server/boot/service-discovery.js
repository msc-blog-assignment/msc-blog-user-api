'use strict';

const cfenv = require('cfenv');
const packageJson = require('../../package');
const consul = require('consul')({
  host: process.env.SERVICE_DISCOVERY_HOST,
  port: process.env.SERVICE_DISCOVERY_PORT || '/',
  secure: !process.env.SERVICE_DISCOVERY_PORT,
  promisify: true
});

module.exports = () => {
  return consul.agent.service.register({
    name: packageJson.name,
    address: cfenv.getAppEnv().url
  });
};
