import "./auth/events.js";
import "./todo/events.js";
import { initUser } from "./auth/user.js";
import { updateHeader } from "./auth/ui.js";
import { zainicjiujListe } from "./todo/todolist.js";

const init = async () => {
  const user = await initUser();

  if (user) {
    updateHeader();
    await zainicjiujListe();
  }
};

init();