import { addTask, getAllTodos, editTask } from "./api.js";
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

const addTaskToList = (task) => {
  if (!task) return;

  const li = document.createElement("li");
  li.setAttribute("id", task.id);

  const span = document.createElement("span");
  span.textContent = task.name;

  const editBtn = document.createElement("button");
  editBtn.textContent = "edytuj";
  editBtn.addEventListener("click", () => handleEdit(task.id, span));

  li.appendChild(span);
  li.appendChild(editBtn);
  todoList.insertBefore(li, todoList.children[0]);
};

const handleEdit = async (id, spanText) => {
  const newName = prompt("Nowa nazwa zadania:", spanText.textContent);

  if (!newName || newName === spanText.textContent) {
    alert("Błąd: Brak terści lub ta sama nazwa");
    return null;
  }

  const updated = await editTask(id, newName);

  if (updated) {
    spanText.textContent = updated.name;
  }
};

export const zainicjiujListe = async () => {
  const todos = await getAllTodos();
  todos.forEach(addTaskToList);
};
