import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Appointments, { AppointmentsDocument } from "../model/appointments";

const create = async (input: DocumentDefinition<AppointmentsDocument>) => {
    return Appointments.create(input);
}

const findAllBy = async (query: FilterQuery<AppointmentsDocument>,  options: QueryOptions = { lean: true }) =>{
    return Appointments.find(query, {}, options);
}

const findAndUpdate = async (query: FilterQuery<AppointmentsDocument>,  update: UpdateQuery<AppointmentsDocument>,  options: QueryOptions) => {
    return Appointments.findOneAndUpdate(query, update, options);
}

const deleteById = async (query: FilterQuery<AppointmentsDocument>) =>{
    return Appointments.deleteOne(query);
}

export default { create, findAllBy, findAndUpdate, deleteById};