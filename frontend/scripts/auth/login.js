import { AUTH_URL } from "./consts.js";
import { setUser } from "./user.js";
import { closeModal, updateHeader } from "./ui.js";
import { todoList } from "../todo/selectors.js";
import { zainicjiujListe } from "../todo/todolist.js";

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
    localStorage.setItem("token", body.token);
    closeModal();
    updateHeader();
    todoList.innerHTML = "";
    zainicjiujListe();
  } catch (err) {
    console.log(err);
  }
};
