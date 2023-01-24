const express = require("express")
//Função Router permite trabalhar com as rotas de maneira centralizada
const router = express.Router()

const controller = require('./../controllers/tasks.controller')

router.get("/", controller.get)

router.post("/", controller.post)

router.route("/:id")
    .get(controller.getById)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.delete)

module.exports = router


// //Configuração de um middleware para poder fazer aceitar as requisições enviadas via http como json.
// app.use(express.json())
// //Faz a mesma coisa do express.json() só que com as requisições que chegam via URL.
// app.use(express.urlencoded({extended:true}))
// app.get("/tasks", (request, response) => {
//     //o metodo send devolve os dados pro cliente
//     response.send(tasks)

    
// })

// app.post("/tasks", (request, response)=>{
//     //request.body coleta o que veio na request passada pela função através do body
//     // console.log(request.body)
//     const { title, userId } = request.body
//     // console.log(tasks.length)
//     const newTask = { 
//         title, 
//         completed: false, 
//         createdAt : Date.now(), 
//         updatedAt : null, 
//         userId, 
//         id : tasks[tasks.length - 1].id + 1
//     }
//     tasks.push(newTask)
//     const add = {"success":true,"message":"Tarefa adicionada"}
//     //Devolvo o obj criado, mas poderia só mandar o end()
//     response.send(add)
// })

// app.route("/tasks/:id")
//     .get((req, res) => res.send(tasks.filter(task => task.id == parseInt(req.params.id))))
//     .put((req, res) => {
//         const {title, completed, createdAt, updatedAt, id, userId} = req.body
//         const newTask = {title, completed, createdAt, updatedAt, id, userId}

//         const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))

//         //Remove o elemento na posição task index, quantidade de itens removido, qual objeto será adicionado
//         tasks.splice(taskIndex, 1, newTask)

//         const edit = {"success":true,"message":"Tarefa editada"}
//         res.send(edit)
//     })
//     .patch((req, res) => {
//         const {title, completed, userId} = req.body
//         const taskById = tasks.filter(task => task.id === parseInt(req.params.id))[0]
//         const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))

//         const updated = Date.now()

//         const taskUpdated = {title, completed, userId}

//         for (const prop in taskUpdated) {
//             if (typeof taskUpdated[prop] === "undefined")           
//             delete taskUpdated[prop]
//         }

//         const newTask = {...taskById, ...taskUpdated}

//         tasks.splice(taskIndex, 1, newTask)

//         res.send(newTask)
//     })
//     .delete((req, res) => {
//         const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))

//         const deletedTask = tasks.splice(taskIndex,1)

//         const deleted = {"success":true,"message":"Tarefa deletada"}

//         res.send(deleted)
//     })