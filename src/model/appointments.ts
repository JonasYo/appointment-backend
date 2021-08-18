import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user";

export interface AppointmentsDocument extends mongoose.Document {
  user_id: UserDocument["_id"];
  date: Date;
  hour_id: string;
  has_done: Boolean;
  is_active: Boolean;
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: true },
    hour_id: { type: String, default: true },
    has_done: { type: Boolean, default: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Appointments = mongoose.model<AppointmentsDocument>("Appointments", AppointmentsSchema);

export default Appointments;
