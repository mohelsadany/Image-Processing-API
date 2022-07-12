// in this file we are checking our endpoints

//import superTest module to test endpoints, supertest used to abstract testing HTTP routes 
import supertest from 'supertest';

//import app express object from server file
import app from '../..';

//create superTest object, pass app to supertest() so the it can access request and response functionalities from express.
const requestMainEndpoint = supertest(app);

//create our suite
describe('testing our mainEndpoint middleware endpoint', () => {
  //create it block with async function as superTest need
  it('testing the server status using superTest', async () => {
    //get the response to the request object with it's route
    //here we insert the route for the middleware that we want to test, here we test 'mainEndpoint'.
    const response = await requestMainEndpoint.get(
      '/image/?filename=image&width=750&height=750'
    );

    // use response object value in the expect block
    expect(response.status).toEqual(200);
  });
});
