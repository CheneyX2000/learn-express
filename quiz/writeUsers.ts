import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import { User } from './types';

const router = express.Router()

const dataFile = '../data/users.json';
//const dataFile = path.resolve(__dirname, '..', 'data', 'users.json');

router.post('/adduser', async (req: Request, res: Response) => {
  try {
    const data = await fsPromises.readFile(dataFile, 'utf8');
    let users: User[] = JSON.parse(data) as User[];

    const newUser = req.body as User;

    users.push(newUser);

    await fsPromises.writeFile(
      dataFile,
      JSON.stringify(users, null, 2),
      'utf8'
    );

    console.log('User saved successfully');
    return res.status(201).json({ message: 'User added successfully.' });
  } catch (error) {
    console.error('Error handling the request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
