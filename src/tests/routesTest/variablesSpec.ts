// in this file we check all the variables in our project with different tests

//import variables
import { mainEndpoint } from '../../routes/mainEndpoint'; //express instance
import { app, port } from '../../index';

//1) test if all the variables are initialized or not
describe('Check if the variables at index.ts is initialized or not', () => {
  it('check is (app) is defined', () => {
    expect(app).toBeDefined();
  });

  it('check if (port) is defined', () => {
    expect(port).toBeDefined();
  });
});

describe('Check if the variables at mainEndpoint.ts is initialized or not', () => {
  it('check if (mainEndpoint) is defined', () => {
    expect(mainEndpoint).toBeDefined();
  });
});
