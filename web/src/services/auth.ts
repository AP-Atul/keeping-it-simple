import client from "./client";

export const signInAnon = async () => {
  try {
    const response = await client.post("/auth/anon-signin");
    const token = response.data.auth_token;
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    console.log("auth-api: error ", err);
  }
};
