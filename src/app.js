const express = require("express")

const app = express()
//declaração de repositorio de arquivos estáticos
app.use(express.static('./public'))
//Configuração de um middleware para poder fazer aceitar as requisições enviadas via http como json.
app.use(express.json())
//Faz a mesma coisa do express.json() só que com as requisições que chegam via URL.
app.use(express.urlencoded({extended:true}))

const tasksRoutes = require('./routes/tasks')

app.get("/", (req, res) => {
    res.status(200).send({"Message":"API works!"})
})
//Sempre que houver uma chamada para o /tasks vou delegar a chamada para tasksRoutes
app.use("/tasks", tasksRoutes)

module.exports = app