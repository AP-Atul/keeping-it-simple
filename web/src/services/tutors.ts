import _ from "lodash";
import { SearchTutor } from "../types";
import client from "./client";

export const search = async (options: SearchTutor) => {
  try {
    const response = await client.get("/tutors/search", {
      params: _.omitBy(options, _.isEmpty),
    });
    return response.data;
  } catch (err) {
    return undefined;
  }
};
