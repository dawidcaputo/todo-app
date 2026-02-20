//modal
const openAuthModalBtn = document.querySelector(".auth-modal-open-btn");
const authModal = document.querySelector(".auth-modal");
const authModalCloseBtn = authModal.querySelector(".auth-modal-close-btn");

//switch mode
const authModeSwitchBtn = authModal.querySelector(".auth-mode-swtich-btn");
const authModeSwitchText = authModal.querySelector(".auth-mode-swtich-text");

//form
const loginForm = authModal.querySelector(".login-form");
const registerForm = authModal.querySelector(".register-form");

const loginEmailInput = authModal.querySelector(".login-email-input");
const loginPasswordInput = authModal.querySelector(".login-password-input");

const registerNameInput = authModal.querySelector(".register-name-input");
const registerEmailInput = authModal.querySelector(".register-email-input");
const registerPasswordInput = authModal.querySelector(
  ".register-password-input",
);

const AUTH_URL = "http://localhost:3000/auth";

//event handlers
openAuthModalBtn.addEventListener("click", () => {
  authModal.classList.remove("hidden");
});

authModalCloseBtn.addEventListener("click", () => {
  authModal.classList.add("hidden");
});

authModeSwitchBtn.addEventListener("click", (el) => {
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
});

loginForm.addEventListener("submit", (el) => {
  el.preventDefault();
  const email = loginEmailInput.value;
  const password = loginPasswordInput.value;

  loginUser(email, password);
});

registerForm.addEventListener("submit", (el) => {
  el.preventDefault();
  const email = registerEmailInput.value;
  const password = registerPasswordInput.value;
  const name = registerNameInput.value;

  registerUser(name, email, password);
});

//logic

const registerUser = async (name, email, password) => {
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

const loginUser = async (email, password) => {
  const LOGIN_URL = `${AUTH_URL}/login`;

  try {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
