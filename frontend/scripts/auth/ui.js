import { loginUser } from "./login.js";
import { registerUser } from "./register.js";
import {
  authModal,
  authModeSwitchText,
  loginEmailInput,
  loginForm,
  loginPasswordInput,
  logoutBtn,
  openAuthModalBtn,
  registerEmailInput,
  registerForm,
  registerNameInput,
  registerPasswordInput,
  nameuser,
} from "./selectors.js";

export const closeModal = () => {
  authModal.classList.add("hidden");
};

export const openModal = () => {
  authModal.classList.remove("hidden");
};

export const switchAuthMode = (el) => {
  const element = el.target;
  const isLoginMode = registerForm.classList.contains("hidden");

  if (isLoginMode) {
    element.textContent = "Zaloguj się";
    authModeSwitchText.textContent = "Masz już konto?";
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    return;
  }

  element.textContent = "Zarejestruj się";
  authModeSwitchText.textContent = "Nie masz jeszcze konta?";
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
};

export const getUserInfoAndLogin = (el) => {
  el.preventDefault();
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  loginUser(email, password);
};

export const getUserInfoAndRegister = (el) => {
  el.preventDefault();
  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;
  const name = registerNameInput.value;

  registerUser(name, email, password);
};

export const toggleLoginBtws = () => {
  logoutBtn.classList.remove("hidden");
  openAuthModalBtn.classList.add("hidden");

  if (toggleLoginBtws) {
    openAuthModalBtn = "hidden";
  }
};
