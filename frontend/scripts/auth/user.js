import { getMe } from "./api.js";

export let user = null;

export const setUser = (currentUser) => {
  user = currentUser;

  if (currentUser) {
    localStorage.setItem("user", JSON.stringify(currentUser));
  } else {
    localStorage.removeItem("user");
  }
};

export const initUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const fetchedUser = await getMe();

  if (fetchedUser) {
    user = fetchedUser;
    localStorage.setItem("user", JSON.stringify(fetchedUser));
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user = null;
  }

  return user;
};