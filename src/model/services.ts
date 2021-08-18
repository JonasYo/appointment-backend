import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface ServicesDocument extends mongoose.Document {
  name: String;
  description: String;
  category: String;
  duration: String;
  price: String;
  is_active: String;
  createdAt: Date;
  updatedAt: Date;
}

const ServicesSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    name: { type: String, default: true },
    description: { type: String, default: true },
    category: { type: String, default: true },
    duration: { type: String, default: true },
    price: { type: String, default: true },
    is_active: { type: String, default: true },
  },
  { timestamps: true }
);

const Services = mongoose.model<ServicesDocument>("Services", ServicesSchema);

export default Services;
