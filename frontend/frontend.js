const button = document.querySelector(".add-tood-btn");
const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");

// const registerBtn = register

const BACKEND_URL = "http://localhost:3000";
const TODOS_URL = `${BACKEND_URL}/todos`;

const fetchAllTodos = async () => {
  try {
    const res = await fetch(TODOS_URL);
    const body = await res.json();

    const todos = body.todos;

    console.log(todos);

    list.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.task;

      list.appendChild(li);
    });
  } catch (err) {
    console.log("nie dzuala");
  }
};

fetchAllTodos();
