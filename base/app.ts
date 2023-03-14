import express from "express";
import db from "./config/dbConnect.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => console.log("Conexão com o banco feita com sucesso"));

const app = express();

// faz com que se consiga interpretar objetos passados por POST e PUT
app.use(express.json());

const livros = [
  { id: 1, titulo: "Senhor dos aneis" },
  { id: 2, titulo: "O hobbit" },
];

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node");
});

app.get("/livros/:id", (req, res) => {
  if (/[\d]/g.test(req.params.id)) {
    const livro = livros.find((livro) => livro.id == parseInt(req.params.id));
    if (livro) res.send(livro);
    res.status(204).send();
  }
  res.status(400).send("Incorrect parameter");
});

app.get("/livros", (req, res) => {
  res.status(200).send(livros);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  const bookIndex = livros.findIndex(
    (livro) => livro.id == parseInt(req.params.id)
  );
  livros[bookIndex].titulo = req.body.titulo;
  res.json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = livros.findIndex((livro) => livro.id == parseInt(id));
  livros.splice(bookIndex, 1);
  res.send(`Livro com id ${id} removido`);
});

export default app;
