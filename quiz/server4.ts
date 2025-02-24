import express, { Express } from 'express';
import cors from 'cors';
import readRouter from './readUsers';
import writeRouter from './writeUsers';

const app: Express = express();
const port = 8000;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/read', readRouter);
app.use('/write', writeRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
