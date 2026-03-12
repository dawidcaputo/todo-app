export let user = JSON.parse(localStorage.getItem("user"));

export const setUser = (currentUser) => {
  user = currentUser;

  if (currentUser) {
    localStorage.setItem("user", JSON.stringify(currentUser));
  } else {
    localStorage.removeItem("user");
  }
};
