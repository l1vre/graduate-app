import { SessionData } from 'express-session';
import { User } from 'src/users/user.entity';

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}