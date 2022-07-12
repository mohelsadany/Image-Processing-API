//import express
import express from 'express';

//import writeFile function
import { writeFile, readFile } from './utilities/routes';

//import ParsedQs type to be added for the query string from the url
import { ParsedQs } from 'qs';

//create an instance of the express router object to creat new route that we will use with the app object
export const mainEndpoint: express.Router = express.Router();

//require path module
import path from 'path';

//import fs module
import fs from 'fs';

// // create the 1st endpoint
mainEndpoint.get('/', (req: express.Request, res: express.Response): void => {
  // // get the query string from url to be used
  const data: ParsedQs = req.query;

  // // get the width and the height from 'data' object
  const filename: string = data.filename as string;
  const width: number = parseInt(data.width as string);
  const height: number = parseInt(data.height as string);

  // //  in this section I want to check if width and height provided by the user is valid numbers

  //dont give this variable a type because its already initialized according to Type Inference and to prevent my code from being verbose;
  let widthIsNaN = false; //false as default, assume the user input is correct
  let heightIsNan = false;

  // isNaNa return true if argument not a number.
  if (isNaN(width)) {
    widthIsNaN = true;
  }
  if (isNaN(height)) {
    heightIsNan = true;
  }

  // // SEND THE ERROR TO THE USER
  if (widthIsNaN && heightIsNan) {
    res.send(
      `your input height : ( ${data.height} ) and width : ( ${data.width} ) is not a valid numbers, please insert a number`
    );
    //to end execution of the whole endpoint
    return;
  } else if (widthIsNaN) {
    res.send(
      `your input width : ( ${data.width} ) is not a valid number, please insert a number`
    );
    return;
  } else if (heightIsNan) {
    res.send(
      `your input height : ( ${data.height} ) is not a valid number, please insert a number`
    );
    return;
  }

  // // if the width or the height is less than 1 , return error to the user.

  if (width < 1 && height < 1) {
    res.send(
      `Your entered width : ( ${data.width} ) and height : ( ${data.height} ) is less than 1 , please enter a number equal or higher than 1`
    );
    return;
  } else if (width < 1) {
    res.send(
      `Your entered width : ( ${data.width} ) is less than 1 , please enter a number equal or higher than 1`
    );
    return;
  } else if (height < 1) {
    res.send(
      `Your entered height : ( ${data.height} ) is less than 1 , please enter a number equal or higher than 1`
    );
    return;
  }

  // //  using path module, determine the path to image files inside assets folder
  const fullFolderPath: string = path.resolve('./assets/full'); //path to full folder
  const pathToFullImage: string = path.join(fullFolderPath, filename); //path to full selected image
  const thumbFolderPath: string = path.resolve('./assets/thumb'); //path to thumb folder
  const pathToThumbImage: string = path.join(
    thumbFolderPath,
    `name-${filename}-width=${width}-height=${height}`
  ); //path to images inside thumb folder

  // // in this section I want to check that the filename user provide is already in the full folder.

  //thumbFolderContent is the content inside thumb folder, which is the previously processed images.
  const thumbFolderContent: string[] = [];

  // this read all the previously processed images inside thumb folder
  fs.readdirSync('assets/full').forEach((file: string) => {
    // append item to thumbFolderContent array
    thumbFolderContent.push(file);
  });

  //indexOf array method returns -1 if the argument is not inside the caller array, and buy comparing with (!= -1 )we are saying that if it's in .
  //this conditional means that the input file name is not in full folder.
  if (thumbFolderContent.indexOf(`${filename}.jpeg`) == -1) {
    res.send(
      `Your input file name : ( ${data.filename} ) is not inside /assets/full folder, please insert your image first`
    );
    return;
  }

  // //  add these two calls inside IIFE and make it asynchronous to force readeFile to wait for the promise returned by writeFile, so  the API dos'nt read before it write's.
  (async function () {
    //call the function to process and write new images, and add await before it to make readFile waits for it's return
    await writeFile(
      width,
      height,
      pathToFullImage,
      pathToThumbImage,
      thumbFolderPath,
      filename
    );

    //call the readFile function
    readFile(res, pathToThumbImage);
  })();
});

export default mainEndpoint;
