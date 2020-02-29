import { AxiosResponse } from 'axios';

const testJson = require('../../test.json');

const axiosResponse: AxiosResponse = {
  data: testJson,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

export default {
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
  },
  get: jest.fn(() => Promise.resolve(axiosResponse)),
};
