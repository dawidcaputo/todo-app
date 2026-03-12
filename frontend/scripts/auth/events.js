import { logout } from "./logout.js";
import {
  authModalCloseBtn,
  openAuthModalBtn,
  authModeSwitchBtn,
  registerForm,
  loginForm,
  logoutBtn,
} from "./selectors.js";
import {
  closeModal,
  getUserInfoAndLogin,
  getUserInfoAndRegister,
  openModal,
  switchAuthMode,
  updateHeader,
} from "./ui.js";
import { user } from "./user.js";

openAuthModalBtn.addEventListener("click", openModal);

logoutBtn.addEventListener("click", logout);

authModalCloseBtn.addEventListener("click", closeModal);

authModeSwitchBtn.addEventListener("click", switchAuthMode);

loginForm.addEventListener("submit", getUserInfoAndLogin);

registerForm.addEventListener("submit", getUserInfoAndRegister);

if (user) {
  updateHeader();
}
