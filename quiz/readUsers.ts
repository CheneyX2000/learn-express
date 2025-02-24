import { Router, Request, Response, NextFunction } from 'express';
import { promises as fsPromises } from 'fs';
import { User } from './types';

let users: User[] = [];
const dataFile = '../data/users.json';
// const dataFile = path.resolve(__dirname, '..', 'data', 'users.json');

async function loadUsers(): Promise<void> {
  try {
    const data = await fsPromises.readFile(dataFile, 'utf8');
    users = JSON.parse(data) as User[];
    console.log('Users loaded successfully.');
  } catch (error) {
    console.error('Failed to load users:', error);
    users = [];
  }
}

loadUsers();

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  if (!users || users.length === 0) {
    return res.status(404).json({ error: 'No users found or file empty' });
  }
  next();
});

router.get('/', (req: Request, res: Response) => {
  res.json(users);
});


router.get('/:username', (req: Request, res: Response) => {
  const { username } = req.params;
  const foundUser = users.find((user) => user.username === username);

  if (!foundUser) {
    return res
      .status(404)
      .json({ error: `${username} not found` });
  }

  res.json(foundUser);
});

export default router;
