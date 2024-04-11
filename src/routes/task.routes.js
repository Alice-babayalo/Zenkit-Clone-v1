import express from 'express';
const taskRouter = express.Router();
import { test, addTask, deleteTask, getTasks, findById, updateTask, setTime } from '../controllers/task.controller.js';

taskRouter.get('/test', test);
taskRouter.post('/add', setTime, addTask);
taskRouter.get('/list', getTasks);
taskRouter.put('/update', updateTask);
taskRouter.get('/findById', findById);
taskRouter.delete('/delete', deleteTask);

export default taskRouter;