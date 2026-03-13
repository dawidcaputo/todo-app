// todo/todolist.js
import { addTask, getAllTodos } from "./api.js";
import { toDoInput } from "./selectors.js";
import { addTaskToList } from "./render.js";
import { user } from "../auth/user.js";

export let ToDoTabela = [];

export const dodanieDoListy = async () => {
  if (!user) {
    alert("Musisz być zalogowany aby dodać zadanie!");
    return;
  }

  const inputValue = toDoInput.value;

  if (!inputValue) {
    alert("brak treści");
    return;
  }

  if (
    inputValue === "banan" ||
    inputValue === "pomidor" ||
    inputValue === "ananas" ||
    inputValue === "autobus"
  ) {
    alert("nie odpowiednia treść");
    toDoInput.value = "";
    return;
  }

  toDoInput.value = "";

  const task = await addTask(inputValue);
  if (!task) return;

  ToDoTabela.unshift(task);
  addTaskToList(task);
};

export const obslugaWcisnieciaPrzycisku = (event) => {
  if (event.keyCode !== 13) return;
  dodanieDoListy();
};

export const zainicjiujListe = async () => {
  if (!user) return;
  const todos = await getAllTodos();
  todos.forEach((todo) => addTaskToList(todo));
};