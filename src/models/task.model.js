const  { model, Schema } = require("mongoose");

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Todo","In Progress", "Completed", "Late", "Over-due"],
            message: "{VALUE} is not a valid status",
        },
        default: "Todo",
    },
    dueDate: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: false,
        },
        durationType: {
            type: String,
            required: false,
            enum: {
                values: ["Minutes","Hours","Days", "Weeks", "Months"],
                message: "{VALUE} is not a valid duration type",
            },
        }
    }
});

const Task = model("Task", TaskSchema);


module.exports= Task;