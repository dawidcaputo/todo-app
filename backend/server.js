import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import jwt from "jsonwebtoken";

const SECRET = "super_tajny_klucz_123";

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors());

const db = await open({
  filename: "baza.db",
  driver: sqlite3.Database,
});

await db.run(
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, userId INTEGER)",
);
await db.run("ALTER TABLE todos ADD COLUMN userId INTEGER").catch(() => {});

await db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)",
); //TODO: hash

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

// localhost:3000/auth/register
// auth
app.post("/auth/register", async (req, res) => {
  try {
    const getExistedUserSQL = "SELECT * FROM users WHERE email = ? OR name = ?";
    const existedUser = await db.get(getExistedUserSQL, [
      req.body.email,
      req.body.name,
    ]);

    if (existedUser) {
      // ZMIANA: używamy .status() zamiast .statusCode()
      return res.status(401).json({
        status:
          "this user already exists. please use differnet username or email",
      });
    }

    const registerNewUserSQL =
      "INSERT INTO users ( name, email, password ) VALUES (?, ?, ?)";

    await db.run(registerNewUserSQL, [
      req.body.name,
      req.body.email,
      req.body.password,
    ]);

    return res.status(201).json({ status: "user created. please log in" });
  } catch (err) {
    return res.status(500).json({ status: "an error occured" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const loginUserSQL = "SELECT * FROM users WHERE email = ? AND password = ?";
    const user = await db.get(loginUserSQL, [
      req.body.email,
      req.body.password,
    ]);

    if (!user) {
      // ZMIANA: używamy .status() zamiast .statusCode()
      return res
        .status(404)
        .json({ status: "user not found or wrong password" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET);
    return res.json({ status: "ok", user, token });
  } catch (err) {
    // ZMIANA: 12poprawne przypisanie statusu błędu
    return res.status(500).json({ status: "an error occured" });
  }
});

//TODO: logout
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ status: "brak tokenu" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ status: "nieprawidłowy token" });
  }
};
// todos
app.get("/todos", verifyToken, async (req, res) => {
  try {
    const sql = "SELECT * FROM todos WHERE userId = ?";
    const rows = await db.all(sql, [req.userId]);
    return res.json({ status: "ok", todos: rows });
  } catch (err) {
    return res.status(500).json({ status: "an error occured" });
  }
});

app.post("/todos", verifyToken, async (req, res) => {
  try {
    const { taskName } = req.body;
    const sql = "INSERT INTO todos (name, userId) VALUES (?, ?)";
    const result = await db.run(sql, [taskName, req.userId]);
    const row = await db.get("SELECT * FROM todos WHERE id = ?", [
      result.lastID,
    ]);
    return res.json({ task: row, status: "created" });
  } catch (err) {
    return res.status(500).json({ status: "an error occured" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newItem = req.body.name;

    const existing = await db.get("SELECT * FROM todos WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ status: "todo not found" });
    }

    const sql = "UPDATE todos SET name = ? WHERE id = ?";
    await db.run(sql, [newItem, id]);

    const updatedTodo = await db.get("SELECT * FROM todos WHERE id = ?", [id]);
    return res.json({ status: "ok", todo: updatedTodo });
  } catch (err) {
    return res.status(500).json({ status: "an error occured" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const existing = await db.get("SELECT * FROM todos WHERE id = ?", [id]);

    if (!existing) {
      return res.status(404).json({ status: "Item not found" });
    }

    await db.run("DELETE FROM todos WHERE id = ?", [id]);
    return res.json({ status: "ok", id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Server error" });
  }
});
