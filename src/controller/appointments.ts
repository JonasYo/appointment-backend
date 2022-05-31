import { Request, Response } from "express";
import { get, isNull } from "lodash";
import appointmentsService from "../service/appointments";
import schedulesService from "../service/schedules";

const create = async(req: Request, res: Response) => {
  const userId = get(req, "user._id");

  const { body } = req;
  const date = new Date(body.date);

    const appointment = await appointmentsService.create({ ...body, date, userId });

  return res.send({ appointment });
}

const update = async (req: Request, res: Response) => {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");
  const update = req.body;

    const post = await appointmentsService.findAllBy({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

//   if (String(post.userId) !== userId) {
//     return res.sendStatus(401);
//   }

    const updatedPost = await appointmentsService.findAndUpdate({ postId }, update, { new: true });

  return res.send(updatedPost);
}

const listAvailableTimes = async (req: Request, res: Response) => {
  const { serviceId, date } = req.params;
  
  const dateFormatted = new Date(date);
    const appointments = await appointmentsService.findAllBy({ serviceId, date: dateFormatted });

    if (!appointments.length) {
        const availableTimes = await schedulesService.findAllBy({});

        return res.send({ availableTimes });
    }

    const reservedTimes = appointments.map(item => item.scheduleId);
    const availableTimes = await schedulesService.findAllBy({ _id: { $nin: reservedTimes }});

    return res.send({ availableTimes });
}

const listAllByUser = async (req: Request, res: Response) => {
    const userId = get(req, "user._id");

    const appointments = await appointmentsService.findAllBy({ userId: { $eq: userId } });

    if (!appointments.length) return res.send([]);

    return res.send({ appointments });
}

const deleteById = async(req: Request, res: Response) =>{
    const { userId, appointmentId } = req.params;

    const post = await appointmentsService.findAllBy({ appointmentId });

  if (!post) {
    return res.sendStatus(404);
  }

//     if (String(post.userId) !== String(userId)) {
//     return res.sendStatus(401);
//   }

    await appointmentsService.deleteById({ appointmentId });

  return res.sendStatus(200);
}

export default {
    create,
    update,
    listAvailableTimes,
    listAllByUser,
    deleteById
}