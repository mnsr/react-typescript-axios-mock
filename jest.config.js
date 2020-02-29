const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    ...tsjPreset.transform,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
