import { addTask, getAllTodos } from "./api.js";
import { toDoInput, todoList } from "./selectors.js";

export let ToDoTabela = [];

export const dodanieDoListy = async () => {
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

  if (!task) {
    return;
  }

  ToDoTabela.unshift(task);
  addTaskToList(task);
};

export const obslugaWcisnieciaPrzycisku = (event) => {
  if (event.keyCode !== 13) {
    return;
  }
  dodanieDoListy();
};

//   = () => {
//   const nowyElemant = document.createElement("li");
//   nowyElemant.textContent = ;
//   todoList.appendChild(nowyElemant);
//   };

// };

const addTaskToList = (task) => {
  if (!task) {
    return;
  }

  const nowyElemant = document.createElement("li");
  nowyElemant.textContent = task.name;
  nowyElemant.setAttribute("id", task.id);
  todoList.insertBefore(nowyElemant, todoList.children[0]);
};

export const zainicjiujListe = async () => {
  const todos = await getAllTodos();
  todos.forEach(addTaskToList);
};
