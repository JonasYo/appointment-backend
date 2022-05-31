import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface SchedulesDocument extends mongoose.Document {
  hour: Date;
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
  },
  { timestamps: true }
);

const Schedules = mongoose.model<SchedulesDocument>("Schedules", SchedulesSchema);

export default Schedules;
