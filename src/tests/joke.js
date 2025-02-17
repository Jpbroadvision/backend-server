const supertest = require('supertest');
const server = require('../index');
const {
  expectHtmlTypeHeader,
  expectCode,
  expect400,
  expect200,
} = require("../library/testUtils");

const requestWithSupertest = supertest(server);

describe('GET /jokes', () => {
  it('should return a 200 and all the jokes', async () => {
    const res = await requestWithSupertest.get('/jokes');

    expect(typeof res.body).toBe('object');
    expect(Array.isArray(res.body)).toBe(true);
    expect200(res);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });
});

describe('GET /jokes/:id', () => {
  it('should return a 200 and all the jokes', async () => {
    const res = await requestWithSupertest.get('/jokes/0');
    expect(res.type).toEqual(expect.stringContaining('html'));
  });
});

describe('GET /jokes/count', () => {
  it('should return a 200 and the joke count', async () => {
    const res = await requestWithSupertest.get('/jokes/count');

    expect(typeof res.text).toBe('string');

    const number = parseInt(res.text, 10);
    expect(typeof number !== 'number').toBe(false);

    expect200(res);
    expect(res.type).toEqual(expect.stringContaining('html'));
  });
});

describe('GET /jokes/random', () => {
  it('should return a 200 and a joke', async () => {
    const res = await requestWithSupertest.get('/jokes/random');

    expect(typeof res.text).toBe('string');
    expect200(res);
    expect(res.type).toEqual(expect.stringContaining('html'));
  });
});

describe('GET /joke', () => {
  it('should return a 200 and a joke', async () => {
    const res = await requestWithSupertest.get('/joke');

    expect(typeof res.text).toBe('string');
    expect200(res);
    expect(res.type).toEqual(expect.stringContaining('html'));
  });
});
