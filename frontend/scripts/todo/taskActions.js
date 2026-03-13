import { editTask, deleteTask } from "./api.js";

export const handleEdit = async (id, span) => {
  const newName = prompt("Nowa nazwa zadania:", span.textContent);

  if (!newName || newName === span.textContent) {
    alert("Błąd: Brak treści lub ta sama nazwa");
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