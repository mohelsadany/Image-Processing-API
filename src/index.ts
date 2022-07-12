//require express to build a server
import express from 'express';

//import external middleware
import mainEndpoint from './routes/mainEndpoint';

//create an instance of the app object
export const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('this is the main page from another route!');
});

app.use('/image', mainEndpoint);

//port number for server
//dont give this variable a type because its already initialized according to (Type Inference) and to prevent my code from being verbose
export const port = 3000;

//function for checking the server status
export const server = (): void => {
  console.log(`the server is running on port ${port}`);
};

//listen to the port defined
app.listen(port, server);

export default app;
