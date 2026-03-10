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
  const reqConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(TODOS_URL, reqConfig);
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

export const editTask = async (id, newName) => {
  const req = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  };

  try {
    const res = await fetch(`${TODOS_URL}/${id}`, req);
    const body = await res.json();

    if (res.status === 404) {
      alert("Błąd: to zadanie nie istnieje!");
      return null;
    }

    if (res.status !== 200) {
      console.log("Błąd edycji");
      return null;
    }

    return body.todo;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (id) => {
  const req = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(`${TODOS_URL}/${id}`, req);

    return await res.json();
  } catch (err) {
    return { status: "Server error" };
  }
};
