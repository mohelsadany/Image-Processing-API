// in this file we are checking  functions in our project

//importing functions
import { server } from '..'; //from index.ts
import { writeFile, readFile } from '../routes/utilities/routes';

//import path module
import path from 'path';

// test our functions that they were defined
describe('check if functions defined or not', () => {
  it('server function from index.ts', () => {
    expect(server).toBeDefined();
  });
  it('writeFile function from mainEndpoint.ts', () => {
    expect(writeFile).toBeDefined();
  });
  it('readFile function from mainEndpoint.ts', () => {
    expect(readFile).toBeDefined();
  });
});

//test our image processing function that it dose'nt has errors when called.
describe('Test writeFile function', () => {
  it("Check if writeFile function dose'nt has errors", () => {
    //we add async to this function call because the function itself is asynchronous and we need to await it so the test waits for its response.
    expect(async () => {
      const width = 300;
      const height = 300;
      const filename = 'image';
      const fullFolderPath: string = path.resolve('./assets/full'); //path to full folder
      const pathToFullImage: string = path.join(fullFolderPath, filename); //path to full selected image
      const thumbFolderPath: string = path.resolve('./assets/thumb'); //path to thumb folder
      const pathToThumbImage: string = path.join(
        thumbFolderPath,
        `name-${filename}-width=${width}-height=${height}`
      );
      await writeFile(
        width,
        height,
        pathToFullImage,
        pathToThumbImage,
        thumbFolderPath,
        filename
      );
      // add .not to the chain because we dont expect the function to throw any errors
    }).not.toThrow();
  });
});
