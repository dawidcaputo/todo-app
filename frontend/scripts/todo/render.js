import { todoList } from "./selectors.js";
import { handleEdit, handleDelete } from "./taskActions.js";

export const addTaskToList = (task) => {
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