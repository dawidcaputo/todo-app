import { BASE_URL } from "./consts.js";

export const getMe = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });

    if (res.status !== 200) return null;

    const body = await res.json();
    return body.user;
  } catch (err) {
    console.log(err);
    return null;
  }
};