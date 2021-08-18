import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Appointments, { AppointmentsDocument } from "../model/appointments";

export function createPost(input: DocumentDefinition<AppointmentsDocument>) {
    return Appointments.create(input);
}

export function findPost(
  query: FilterQuery<AppointmentsDocument>,
  options: QueryOptions = { lean: true }
) {
    return Appointments.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<AppointmentsDocument>,
  update: UpdateQuery<AppointmentsDocument>,
  options: QueryOptions
) {
    return Appointments.findOneAndUpdate(query, update, options);
}

export function deletePost(query: FilterQuery<AppointmentsDocument>) {
    return Appointments.deleteOne(query);
}
