const express = require('express');
const taskRouter = express.Router();
const { test, addTask, deleteTask, getTasks, findById, updateTask, setTime } = require('../controllers/task.controller.js');

taskRouter.get('/test', test);
taskRouter.post('/add', setTime, addTask);
taskRouter.get('/list', getTasks);
taskRouter.put('/update', updateTask);
taskRouter.get('/findById', findById);
taskRouter.delete('/delete', deleteTask);

export default taskRouter;