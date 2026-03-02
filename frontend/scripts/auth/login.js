import { AUTH_URL } from "./consts.js";
import { setUser, user } from "./user.js";
import { closeModal, updateHeader } from "./ui.js";

export const loginUser = async (email, password) => {
  const LOGIN_URL = `${AUTH_URL}/login`;
  const requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const res = await fetch(LOGIN_URL, requestConfig);
    const body = await res.json();

    if (res.status !== 200) {
      console.log("blad", body);
      return;
    }

    setUser(body.user);
    closeModal();

    updateHeader();

    console.log(user);
  } catch (err) {
    console.log(err);
  }
};
