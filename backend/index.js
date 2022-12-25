import  express from 'express'
import mysql from "mysql"
import cors from 'cors'

const app = express()
const port = 8800

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"test"
})

//If auth problem alternative user "root"@"localhost"

app.get('/', (req, res) => {
  res.json('this it backend side')
})

app.get('/books', (req, res) => {
    const q = "SELECT * FROM test.books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
  });

 app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]
    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book api is created");
    });
 }) ;

 app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId],(err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted");
    });
 });

 app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?,`desc` = ?,`price` = ?,`cover` = ? WHERE id = ?";

    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

    db.query(q, [...values, bookId],(err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been update");
    });
 });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})