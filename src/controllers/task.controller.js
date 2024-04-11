const TaskModel = require('../models/task.model.js');

const test = (req, res, next) => {
    res.send('Hello World!');
}


const setTime = async (req, res, next) => {
    try {
        if (TaskModel.dueDate.startDate && TaskModel.dueDate.endDate) {
            const startDate = new Date(TaskModel.dueDate.startDate);
            const endDate = new Date(TaskModel.dueDate.endDate);
            const durationInMs = endDate - startDate;
    
            // Convert milliseconds to minutes, hours, or days
            const durationInMinutes = durationInMs / (1000 * 60);
            const durationInHours = durationInMs / (1000 * 60 * 60);
            const durationInDays = durationInMs / (1000 * 60 * 60 * 24);
    
            // Determine the appropriate unit and duration
            let duration;
            let durationType;
            if (durationInDays >= 1) {
                duration = Math.round(durationInDays);
                durationType = "Days";
            } else if (durationInHours >= 1) {
                duration = Math.round(durationInHours);
                durationType = "Hours";
            } else {
                duration = Math.round(durationInMinutes);
                durationType = "Minutes";
            }
    
            //return { duration, durationType };
            return res.status(200).send({message: "the duration of the task is "+duration+" "+durationType})
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }
    // Your task.
    // Calculate the duration of the task by using the startDate and endDate.
    // Determine wether the duration is in min, hours, days.
    next();
}

const addTask = async (req, res, next) => {
    try {
        const newTask = await TaskModel.create(req.body);
        return res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
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
const updateTask = async (req, res, next) => {
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

const findById = async (req, res, next) => {
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

const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.query.id);
        return res.status(200).json({ message: 'Task deleted'});
    } catch (error) {
        next(error);
    }
}


module.exports = {test, setTime, addTask, getTasks, updateTask, findById, deleteTask};