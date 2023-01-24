import { createFetch } from "../createFetch.js"
import { Task } from "../Model/Task.model.js"
import { userId } from './../config.js'

export default class TasksController {
    constructor(service, view) {
        this.service = service
        this.view = view
    }

    add(title) {
        this.service.add(
            new Task(title),
            () => this.view.render(this.service.tasks),
            (erro) => alert(erro),
            userId
        )
    }

    remove(id) {
        this.service.remove(id,
            () => this.view.render(this.service.tasks),
            (erro) => alert(erro),
            userId
        )
    }

    update(task) {
        task.updatedAt = Date.now()
        this.service.update(task,
            () => this.view.render(this.service.tasks),
            (erro) => alert(erro),
            userId
        )
    }
    async toggleDone(id) {
        const task = await this.service.getById(id)
        const { completed } = task
        console.log(completed +"--"+ id)

        this.update({ completed: !completed, id }, userId)
    }

    
    getTasks() {
        this.service.getTasks(
                userId,
                () => this.view.render(this.service.tasks),
                (erro) => alert(erro)
            )
            
    }
} 