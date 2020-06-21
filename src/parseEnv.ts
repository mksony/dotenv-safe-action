import * as fs from 'fs';
import dotenv from 'dotenv-safe';
import * as core from '@actions/core';

const parseEnv = (
  envPath: string,
  examplePath: string,
): Record<string, string> => {
  if (!fs.existsSync(envPath)) {
    throw new Error('file does not exist');
  }

  const { parsed } = dotenv.config({ path: envPath, example: examplePath });
  core.info(`loading .env file from ${envPath}`);
  core.info(`loading .env.example file from ${examplePath}`);
  if (!parsed) {
    throw new Error('No env variables loaded');
  }

  return parsed;
};

export default parseEnv;
