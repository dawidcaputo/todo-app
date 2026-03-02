import { updateHeader } from "./ui.js";
import { setUser } from "./user.js";

export const logout = () => {
  setUser(null);

  updateHeader();
};
