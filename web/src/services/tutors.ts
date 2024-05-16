import _ from "lodash";
import { SearchTutor } from "../types";
import client from "./client";

export const search = async (options: SearchTutor) => {
  try {
    const response = await client.get("/tutors/search", {
      params: _.omitBy(options, (value): boolean => {
        if (typeof value === "number") return false;
        return _.isEmpty(value);
      }),
    });
    return response.data;
  } catch (err) {
    return undefined;
  }
};

export const profile = async (tutorId: string) => {
  try {
    const response = await client.get(`/tutors/${tutorId}`);
    return response.data;
  } catch (err) {
    return undefined;
  }
};

export const request = async (
  tutorId: string,
  data: { name: string; message: string }
) => {
  try {
    const response = await client.put(`/tutors/${tutorId}/request`, data);
    return response.status === 200;
  } catch (err) {
    return false;
  }
};
