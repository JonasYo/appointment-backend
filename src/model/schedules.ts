import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user";

export interface SchedulesDocument extends mongoose.Document {
  hour: Date;
  unscheduled_time: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SchedulesSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    hour: { type: String, default: true },
    unscheduled_time: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Schedules = mongoose.model<SchedulesDocument>("Schedules", SchedulesSchema);

export default Schedules;
