// types/express/index.d.ts

import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        // add any other properties your user object has
      };
    }
  }
}
