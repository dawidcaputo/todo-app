import { addToDoBtn, searchInput, toDoInput } from "./selectors.js";
import {
  dodanieDoListy,
  filterTasks,
  obslugaWcisnieciaPrzycisku,
  zainicjiujListe,
} from "./todolist.js";

addToDoBtn.addEventListener("click", dodanieDoListy);

toDoInput.addEventListener("keydown", obslugaWcisnieciaPrzycisku);

searchInput.addEventListener("input", filterTasks);

searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) filterTasks();
});

zainicjiujListe();
