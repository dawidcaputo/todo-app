import { searchInput, todoList } from "./selectors.js";

export const filterTasks = () => {
  const query = searchInput.value.toLowerCase().trim();
  const items = todoList.querySelectorAll("li");
  items.forEach((li) => {
    const taskName = li.querySelector("span").textContent.toLowerCase();
    li.style.display = taskName.includes(query) ? "" : "none";
  });
};