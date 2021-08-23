import { Express, Request, Response } from "express";

import { validateRequest, requiresUser } from "./middleware";

import { createUserHandler } from "./controller/user";
import { getAllServices } from "./controller/services";

import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/authentication";


import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user";

export default function (app: Express) {
  app.get('/ping', (req: Request, res: Response) => res.status(204).send({}));

  app.post("/api/signup", validateRequest(createUserSchema), createUserHandler);

  app.post("/api/login", validateRequest(createUserSessionSchema), createUserSessionHandler);

  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  app.get("/api/services", getAllServices);
}
