import fs from 'fs';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import readUsers from './readUsers';
import writeUsers from './writeUsers'
import { User, UserRequest } from './types';

const app = express();
const port = 8000;

let users: User[] | undefined;

fs.readFile(path.resolve(__dirname, '../data/user.json'), 'utf-8', function(err, data) {
  console.log('reading file ... ');
  if (err) throw err;
  users = JSON.parse(data);
})

const addMsgToRequest = function (req: UserRequest, res: Response, next: NextFunction) {
  if (users) {
    req.users = users;
    next();
  } else {
    return res.status(404).json({
      error: {message: 'users not found', status: 404}
    });
  }
}

app.use(cors({origin: 'http://localhost:3000'}));
app.use(addMsgToRequest);
app.use('/read', readUsers);
app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use('/write', writeUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});