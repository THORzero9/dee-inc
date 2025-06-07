import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import type { User } from '@shared/schema'; // Optional: for type safety

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user) {
        // We use a generic message for both non-existent user and incorrect password
        // to avoid leaking information about which usernames exist.
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      
      return done(null, user as User); // Cast to User if using the type import
    } catch (err) {
      // If there's an error during the process (e.g., database error)
      return done(err);
    }
  }
));

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};
