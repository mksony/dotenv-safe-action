import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import core from '@actions/core';
import parseEnv from './parseEnv';

jest.mock('@actions/core', () => ({
  info: jest.fn(),
}));

test('throws if env variables are missing', () => {
  const envExamplePath = path.resolve('fixtures/.env.example.fixture');
  const envPath = path.resolve('fixtures/.env.failure-fixture');
  expect(() => parseEnv(envPath, envExamplePath)).toThrow();
});

test('expect pojo with lower case env variables as keys', async () => {
  const envExamplePath = path.resolve('fixtures/.env.example.fixture');
  const envPath = path.resolve('fixtures/.env.fixture');
  const result = parseEnv(envPath, envExamplePath);
  expect(result).toStrictEqual({ TEST_ENV_1: 'bar', TEST_ENV_2: 'foo' });
});
