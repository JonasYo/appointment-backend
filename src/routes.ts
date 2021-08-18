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
    app.post('/ping', (req: Request, res: Response) => res.status(204).send({}));

  // Register user
    app.post("/api/signup", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/login",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Get all services
  app.get("/api/services", getAllServices);
}
