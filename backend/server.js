import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const db = await open({
  filename: "baza.db",
  driver: sqlite3.Database,
});

await db.run(
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)",
);
await db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)",
); //TODO: hash

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

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

    return res.json({ status: "ok", user });
  } catch (err) {
    // ZMIANA: 12poprawne przypisanie statusu błędu
    return res.status(500).json({ status: "an error occured" });
  }
});

//TODO: logout

// todos
app.get("/todos/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM todos WHERE id = ?";
    const row = await db.get(sql, [req.params.id]);
    return res.json({ status: "ok", todoItem: row });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ status: "an error occured" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const sql = "SELECT * FROM todos";
    const rows = await db.all(sql);

    return res.json({ status: "ok", todos: rows });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ status: "an error occured" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newItem = req.body.item;
    const sql = "INSERT INTO todos ( task ) VALUES (?)";
    await db.run(sql, [newItem]);
    return res.json({ status: "created" });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ status: "an error occured" });
  }
});
