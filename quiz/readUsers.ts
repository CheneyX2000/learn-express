import express, { Request, Response } from 'express';
import { User, UserRequest } from './types';

const router = express.Router();

router.get('/usernames', (req: UserRequest, res: Response) => {
  if (!req.users) {
    return res.status(404).send({ error: { message: "Users not found", status: 404 } });
  }
  let usernames = req.users.map(user => ({ id: user.id, username: user.username }));
  res.send(usernames);
});

router.get('/username/:name', (req: UserRequest, res: Response) => {
  if (!req.users) {
    return res.status(404).send({ error: { message: 'User not found', status: 404 } });
  }
  let name = req.params.name;
  let users_with_name = req.users.filter(user => user.username === name);
  console.log(users_with_name);
  if (users_with_name.length === 0) {
    res.send({
      error: { message: `${name} not found`, status: 404 }
    });
  } else {
    res.send(users_with_name);
  }
});

export default router;