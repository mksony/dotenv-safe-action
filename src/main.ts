import core from '@actions/core';
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

    forEach(variables, function(value, key) {
      core.setOutput(key, value);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
