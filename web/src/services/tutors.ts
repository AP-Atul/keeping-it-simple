import client from "./client";

export const search = async () => {
  try {
    const response = await client.get("/tutors/search");
    return response.data;
  } catch (err) {
    return undefined;
  }
};
