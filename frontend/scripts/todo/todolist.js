import { addTask, getAllTodos, editTask, deleteTask } from "./api.js";
import { searchInput, toDoInput, todoList } from "./selectors.js";
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

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "usuń";
  deleteBtn.addEventListener("click", () => handleDelete(task.id, li));

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  todoList.insertBefore(li, todoList.children[0]);
};

const handleEdit = async (id, span) => {
  const newName = prompt("Nowa nazwa zadania:", span.textContent);

  if (!newName || newName === span.textContent) {
    alert("Błąd: Brak terści lub ta sama nazwa");
    return null;
  }

  const updated = await editTask(id, newName);

  if (updated) {
    span.textContent = updated.name;
  }
};

export const handleDelete = async (id, li) => {
  const response = await deleteTask(id);

  if (!response.id) {
    alert(response.status);
  }

  li.remove();
};

export const zainicjiujListe = async () => {
  if (!user) return;
  const todos = await getAllTodos();
  todos.forEach((todo) => addTaskToList(todo));
};

export const filterTasks = () => {
  const query = searchInput.value.toLowerCase().trim();
  const items = todoList.querySelectorAll("li");
  items.forEach((li) => {
    const taskName = li.querySelector("span").textContent.toLowerCase();
    li.style.display = taskName.includes(query) ? "" : "none";
  });
};
