import TaskModel from '../models/task.model.js';

export const test = (req, res, next) => {
    res.send('Hello World!');
}


export const setTime = async (req, res, next) => {
    console.log(req.body.dueDate);
    var startTime = "";
    var endTime = "";
    if (req.body.dueDate.startDate) {
        startTime = new Date(req.body.dueDate.startDate).toLocaleTimeString();
    }
    if (req.body.dueDate.endDate) {
        endTime = new Date(req.body.dueDate.endDate).toLocaleTimeString();
    }
    req.body.dueDate.startTime = startTime;
    req.body.dueDate.endTime = endTime;

    console.log(req.body.dueDate);
    // Your task.
    // Calculate the duration of the task by using the startDate and endDate.
    // Determine wether the duration is in min, hours, days.
    next();
}

export const addTask = async (req, res, next) => {
    try {
        const newTask = await TaskModel.create(req.body);
        return res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({});
        if (tasks) {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Update a task by its id.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 *
 * @returns {Promise<void>} - Resolves when the task is updated or rejected when an error occurs.
 *
 * @throws {Error} - Throws an error if the task is not found.
 */
export const updateTask = async (req, res, next) => {
    const taskId = req.query.id;
    const updates = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        } 
        return res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req, res, next) => {
    const taskId = req.query.id;
    
    try {
        const foundTask = await TaskModel.findById(taskId);
        if (!foundTask) {
            return res.status(404).json({ message: "Task not found"});
        }
        return res.status(200).json(foundTask);
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.query.id);
        return res.status(200).json({ message: 'Task deleted'});
    } catch (error) {
        next(error);
    }
}