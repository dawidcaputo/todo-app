import { AUTH_URL } from "./consts.js";

export const registerUser = async (name, email, password) => {
  const REGISTER_URL = `${AUTH_URL}/register`;

  try {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
