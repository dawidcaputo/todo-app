import {
  authModalCloseBtn,
  openAuthModalBtn,
  authModeSwitchBtn,
  registerForm,
  loginForm,
} from "./selectors.js";
import {
  closeModal,
  getUserInfoAndLogin,
  getUserInfoAndRegister,
  openModal,
  switchAuthMode,
} from "./ui.js";

openAuthModalBtn.addEventListener("click", openModal);

authModalCloseBtn.addEventListener("click", closeModal);

authModeSwitchBtn.addEventListener("click", switchAuthMode);

loginForm.addEventListener("submit", getUserInfoAndLogin);

registerForm.addEventListener("submit", getUserInfoAndRegister);
