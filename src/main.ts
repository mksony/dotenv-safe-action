import * as core from '@actions/core';
import parseEnv from './parseEnv';
import forEach from 'lodash/forEach';

async function run(): Promise<void> {
  try {
    const envPath = core.getInput('path');
    const envExamplePath = core.getInput('example-path');
    const variables = parseEnv(envPath, envExamplePath);

    core.info(
      `Loaded the following env variables: ${Object.keys(variables).join(
        ', ',
      )}`,
    );

    core.setOutput('generic', 'please check for actual outputs');
    const exportEnvs = core.getInput('export-envs');
    forEach(variables, function(value, key) {
      if (exportEnvs.toLowerCase() === 'true') {
        core.exportVariable(key, value);
      }
      core.setOutput(key, value);
      core.setSecret(value);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
