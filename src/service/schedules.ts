import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Schedules, { SchedulesDocument } from "../model/schedules";

export function findAllBy(
    query: FilterQuery<SchedulesDocument>,
    options: QueryOptions = { lean: true }
) {
    try {

    return Schedules.find(query, {}, options);
} catch (error) {
    console.log('error', error);
}
}

export default { findAllBy }