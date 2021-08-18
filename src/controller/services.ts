import { Request, Response } from "express";
import { findAll } from "../service/services";

export async function getAllServices(req: Request, res: Response) {
  const services = await findAll();

  if (!services) {
    return res.sendStatus(404);
  }

    return res.send(services);
}
