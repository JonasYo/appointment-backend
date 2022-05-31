import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user";
import { ServicesDocument } from "./services";

export interface AppointmentsDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  serviceId: ServicesDocument["_id"];
  date: Date;
  scheduleId: string;
  hasDone: Boolean;
  isActive: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentsSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    date: { type: Date, default: true },
    scheduleId: { type: String, default: true },
    hasDone: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Appointments = mongoose.model<AppointmentsDocument>("Appointments", AppointmentsSchema);

export default Appointments;
