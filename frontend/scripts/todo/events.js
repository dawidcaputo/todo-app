import { addToDoBtn, toDoInput } from "./selectors.js";
import {
  dodanieDoListy,
  obslugaWcisnieciaPrzycisku,
  zainicjiujListe,
} from "./todolist.js";

addToDoBtn.addEventListener("click", dodanieDoListy);

toDoInput.addEventListener("keydown", obslugaWcisnieciaPrzycisku);

zainicjiujListe();
