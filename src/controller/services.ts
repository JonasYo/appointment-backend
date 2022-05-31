import { Request, Response } from "express";
import { findAll } from "../service/services";

const listAll = async (req: Request, res: Response) =>{
  const services = await findAll();

  if (!services) {
    return res.sendStatus(404);
  }

  return res.send(services);
}

export default {
    listAll,
}