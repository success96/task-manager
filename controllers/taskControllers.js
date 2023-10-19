const Tasks = require('../models/taskModel')

const getAllTasks = async (req, res)=>{
    try {
        const tasks = await Tasks.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createTask = async (req, res)=>{
    try {
        const task = await Tasks.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getTask = async (req, res)=>{
    try {
        const {id:taskID}= req.params
        const task = await Tasks.findOne({_id:taskID})
        if (!task){
            res.status(404).json({msg: `No task with id ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})       
    }
}

const updateTask = async (req, res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Tasks.findOneAndUpdate({_id:taskID}, req.body, {
            new: true, runValidators: true,
        })
        if(!task){
            res.status(404).json({msg: `No task with id ${taskID}`})
        }
    } catch (error) {
        res.status(500).json({msg:error})        
    }
    
}

const deleteTask = async (req, res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Tasks.findOneAndDelete({_id:taskID})
        if (!task){
            res.status(404).json({msg: `No task with id ${taskID}`})
        }
        res.status(200).json({msg: `${task.name} has been deleted`})
    } catch (error) {
        res.status(500).json({msg: error})       
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}