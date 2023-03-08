import express from 'express'

const app = express()

// faz com que se consiga interpretar objetos passados por POST e PUT
app.use(express.json())

const livros = [
    { id: 1, "titulo": "Senhor dos aneis" },
    { id: 2, "titulo": "O hobbit" }
]

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node')
})

app.get('/livros', (req, res) => {
    res.status(200).send(livros)
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso')
})

app.put('/livros/:id', (req, res) => {
    let bookIndex = livros.findIndex(livro => livro.id == req.params.id)
    livros[bookIndex].titulo = req.body.titulo
    res.json(livros)
})

export default app