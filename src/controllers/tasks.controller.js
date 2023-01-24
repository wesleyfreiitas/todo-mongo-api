const repository = require("./../repository/tasks.repository")

exports.get = async (req, res) => {
    try {
        let tasks = await repository.get()
        //o metodo send devolve os dados pro cliente
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send({ "message": "Erro 500", err: e })
    }
}
exports.post = async (req, res) => {
    //request.body coleta o que veio na request passada pela função através do body
    // console.log(request.body)
    const { title, userId } = req.body
    if (!title || !userId || isNaN(userId)) {
        return res.status(400).send({ "message": "Erro 400", err: "Falha" })
    }
    const newTask = {
        title,
        completed: false,
        createdAt: Date.now(),
        updatedAt: null,
        userId,
    }

    try {

        const data = await repository.post(newTask)
        console.log(data)
        res.status(201).send(data)
    } catch (e) {
        res.status(500).send({ "message": "Erro 500", err: e })
    }
}

exports.getById = async (req, res) => {
    try {
        const data = await repository.get(req.params.id)
        if (data) {
            res.status(200).send(data)

        } else {
            res.status(404).end()
        }
    } catch (e) {

        res.status(500).send({ "message": "Erro 500", err: e })
    }
}

exports.put = async (req, res) => {
    const { title, completed, createdAt, updatedAt, userId } = req.body
    const newTask = { title, completed, createdAt, updatedAt, 
        // id: req.params.id, 
        userId }

    const values = Object.values(newTask)

    if (values.some(v => v === undefined)) {
        return res.status(400).send({ "message": "Erro 400", err: "Falha" })
    }

    try {
        const data = await repository.put(newTask, req.params.id)
        if (data) {
            res.status(200).send({"success":true,"message":"Tarefa editada"})

        } else {
            res.status(404).end()
        }

    } catch (e) {
        res.status(500).send({ "message": "Erro 500", err: e })

    }

}

exports.patch = async (req, res) => {
    const { title, completed, userId } = req.body
    try {
        const data = await repository.patch({ title, completed, userId }, req.params.id)
        if (data) {
            res.status(200).send({"success":true,"message":"Tarefa editada"})

        } else {
            res.status(404).end()
        }
    } catch (e) {

        res.status(500).send({ "message": "Erro 500", err: e })
    }


}

exports.delete = async (req, res) => {
    try {
        const data = await repository.delete(req.params.id)
        if (data) {
            res.status(200).send({"success":true,"message":"Tarefa deletada"})

        } else {
            res.status(404).end()
        }
    } catch (error) {

        res.status(500).send({ "message": "Erro 500", err: e })
    }
}