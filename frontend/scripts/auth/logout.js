import { updateHeader } from "./ui.js";
import { setUser } from "./user.js";
import { todoList } from "../todo/selectors.js";

export const logout = () => {
  setUser(null);
  localStorage.removeItem("token");
  updateHeader();
  todoList.innerHTML = "";
};
