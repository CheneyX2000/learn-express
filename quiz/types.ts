import { Request } from 'express';

/**
 * Represents a user object stored in users.json
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

/**
 * Extends the default Express Request to optionally include a user array.
 * (You might or might not need this, depending on your middleware usage.)
 */
export interface UserRequest extends Request {
  users?: User[];
}