import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { User, UserRequest } from './types';

const router = express.Router();

router.post('/adduser', (req: UserRequest, res: Response) => {
  if (!req.users) {
    return res.status(404).send({ error: { message: "Users not found ", status: 404 } });
  }
  let newuser: User = req.body;
  req.users.push(newuser);

  fs.writeFile(path.resolve(__dirname, '../data/users.json'), JSON.stringify(req.users), (err) => {
    if (err) console.log('Failed to write');
    else console.log('User Saved');
  });
  res.send('done');
});

export default router;