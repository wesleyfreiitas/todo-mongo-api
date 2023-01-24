const tasks = require("./../../data/tasks.json")
const Task = require('./../../src/models/task.model')
const mongoose = require('mongoose')

exports.get = (id) => { 
    if (id) {
        // return Task.findOne({_id:id})
        return Task.findById(id)
    }
    return Task.find({})
}

exports.post = (data) => {
    // const newData = {
    //     ...data,
    //     id: tasks[tasks.length - 1].id + 1
        
    // }
    const newData = {...data}
    // tasks.push(newData)
    return Task.create(newData)
}

exports.put = (data, id) => {
    // const taskIndex = tasks.findIndex(task => task.id === parseInt(id))
    // if(taskIndex > 0){
    //     return null
    // }
    // tasks.splice(taskIndex, 1, data)
    // return data
    //O find new true é pra poder passar o objeto novo e não o antigo
    return Task.findOneAndUpdate({_id:id}, data, {new:true})
}

exports.patch = (data, id) => {
    const { title, completed, userId } = data
    // const taskById = tasks.filter(task => task.id === parseInt(id))[0]
    // const taskIndex = tasks.findIndex(task => task.id === parseInt(id))
    // if(taskIndex > 0){
    //     return null
    // }
    const updatedAt = Date.now()
    const taskUpdated = { title, completed, userId, updatedAt }  
    for (let prop in taskUpdated) {
        if (typeof taskUpdated[prop] === "undefined") delete taskUpdated[prop]
    }
    // const newTask = { ...taskById, ...taskUpdated }
    // tasks.splice(taskIndex, 1, newTask)

    // return newTask
    return Task.findOneAndUpdate({_id:id}, taskUpdated, {new:true})

}

exports.delete = async (id) => {
    // const taskIndex = tasks.findIndex(task => task.id === parseInt(id))
    // if(taskIndex > 0){
    //     return null
    // }

    // const deletedTask = tasks.splice(taskIndex, 1)

    // return deletedTask
    return Task.findOneAndRemove({_id:id})
}