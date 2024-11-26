/* !!! COPIED FORM BOOTCAMP !!! */

/* the reason why I have this file here is so that the auth.ts file in the middleware doesn't throught an error for attatching user to the req */

declare namespace Express {
    interface Request {
      user?: {
        username: string;
      };
    }
  }
