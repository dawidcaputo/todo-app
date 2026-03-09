import { TODOS_URL } from "./consts.js";

export const addTask = async (task) => {
  const ADDTASK_URL = `${TODOS_URL}`;
  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskName: task,
    }),
  };

  try {
    const res = await fetch(ADDTASK_URL, req);
    const body = await res.json();

    if (res.status !== 200) {
      console.log("Błąd", task);
      return;
    }

    return body.task;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTodos = async () => {
  const req = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(TODOS_URL, req);
    const body = await res.json();

    if (res.status !== 200) {
      console.log("Błąd");
      return;
    }

    return body.todos;
  } catch (err) {
    console.log(err);
  }
};
