const Tasks = require('../models/taskModel')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllTasks = asyncWrapper (async (req, res)=>{
    const tasks = await Tasks.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req, res)=>{
    const task = await Tasks.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper (async (req, res)=>{
    const {id:taskID}= req.params
    const task = await Tasks.findOne({_id:taskID})
    if (!task){
        res.status(404).json({msg: `No task with id ${taskID}`})
    }
    res.status(200).json({task})
})

const updateTask = asyncWrapper (async (req, res)=>{
    const {id:taskID} = req.params
    const task = await Tasks.findOneAndUpdate({_id:taskID}, req.body, {
        new: true, runValidators: true,
    })
    if(!task){
        res.status(404).json({msg: `No task with id ${taskID}`})
    }
    res.status(200).json({task})}
)

const deleteTask = asyncWrapper(async (req, res)=>{
    const {id:taskID} = req.params
    const task = await Tasks.findOneAndDelete({_id:taskID})
    if (!task){
        res.status(404).json({msg: `No task with id ${taskID}`})
    }
    res.status(200).json({msg: `${task.name} has been deleted`})}

)

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}