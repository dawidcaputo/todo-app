import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('baza.db');

db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");


app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});



app.get("/todos/:id", (req, res)=>{
    const sql = "SELECT * FROM todos WHERE id = ?"

    db.get(sql, [req.params.id], (err, row)=>{
        if(err){
            console.log(err)
            res.statusCode = 400

            return res.json({ status: "an error occured"}) 
        }

        return res.json({ status: "ok", todoItem: row}) 
    })
})

app.get("/todos", (req, res)=>{
    const sql = "SELECT * FROM todos"

    db.all(sql, (err, rows)=>{
        if(err){
            res.statusCode = 400

            return res.json({ status: "an error occured"}) 
        }

        return res.json({ status: "ok", todos: rows}) 
    })
})


app.post('/todos', (req, res) => {
    const newItem = req.body.item

    const sql = "INSERT INTO todos ( task ) VALUES (?)"

    db.exec(sql, [newItem], (err)=>{
        if(err){
            console.log(err)
            res.statusCode = 400

            return res.json({ status: "an error occured"}) 
        }

        return res.json({ status: "created"}) 
    })
});