/* eslint-disable jest/no-mocks-import */
import '@testing-library/jest-dom';
import '@/test-utils/__mocks__/matchMedia';

process.env.API_BASE_URL = 'https://api.themoviedb.org';
process.env.API_VERSION = 3;