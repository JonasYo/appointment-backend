import { Request, Response } from "express";
import { get, isNull } from "lodash";
import {
    createAppointment,
    findAppointment,
  findAndUpdate,
    deleteAppointment,
} from "../service/appointments";
import schedulesController from "../service/schedules";

const create = async(req: Request, res: Response) => {
  const userId = get(req, "user._id");

  const { body } = req;
  const date = new Date(body.date);

  const appointment = await createAppointment({ ...body, date, user: userId });

  return res.send({ appointment });
}

const update = async (req: Request, res: Response) => {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");
  const update = req.body;

    const post = await findAppointment({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

//   if (String(post.userId) !== userId) {
//     return res.sendStatus(401);
//   }

  const updatedPost = await findAndUpdate({ postId }, update, { new: true });

  return res.send(updatedPost);
}

const listAvailableTimes = async (req: Request, res: Response) => {
  const { serviceId, date } = req.params;
  
  const dateFormatted = new Date(date);
  const appointments = await findAppointment({ serviceId, date: dateFormatted });

    if (!appointments.length) {
        const availableTimes = await schedulesController.findAllBy({});

        return res.send({ availableTimes });
    }

    const reservedTimes = appointments.map(item => item.scheduleId);
    const availableTimes = await schedulesController.findAllBy({ _id: { $nin: reservedTimes }});

    return res.send({ availableTimes });
}

const deleteById = async(req: Request, res: Response) =>{
    const { userId, appointmentId } = req.params;

    const post = await findAppointment({ appointmentId });

  if (!post) {
    return res.sendStatus(404);
  }

//     if (String(post.userId) !== String(userId)) {
//     return res.sendStatus(401);
//   }

    await deleteAppointment({ appointmentId });

  return res.sendStatus(200);
}

export default {
    create,
    update,
    listAvailableTimes,
    deleteById
}