import { Express, Request, Response } from "express";

import { validateRequest, requiresUser } from "./middleware";

import { createUserHandler } from "./controller/user";
import servicesController from "./controller/services";
import appointmentsController from "./controller/appointments";

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
  app.get('/', (req: Request, res: Response) => res.status(204).send("Express on Vercel"));
  
  app.get('/ping', (req: Request, res: Response) => res.status(204).send({}));

  app.post("/api/signup", validateRequest(createUserSchema), createUserHandler);

  app.post("/api/login", validateRequest(createUserSessionSchema), createUserSessionHandler);
  
//   app.post("/api/user/me", requiresUser);

  app.get("/api/services", requiresUser, servicesController.listAll);

  app.get("/api/appointments/:serviceId/:date", requiresUser, appointmentsController.listAvailableTimes);

    app.get("/api/appointments", requiresUser, appointmentsController.listAllByUser);

  app.post("/api/appointments", requiresUser, appointmentsController.create);

  app.put("/api/appointments", requiresUser, servicesController.listAll);
  
  app.delete("/api/appointments", requiresUser, servicesController.listAll);

  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}
