const  express = require("express");
const  cors = require("cors");
const  mongoose = require("mongoose");
const  configurations = require("./configs/index.js");
const  taskRouter = require("./routes/task.routes.js");
const  ErrorHandler = require("./middlewares/ErrorHandler.js");

const corsOptions = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET", "POST", "UPDATE" ],
    origin: ["http://192.168.1.150:8080", "//https://contact-app-client-xbck.onrender.com/"],
}

const app = express();
app.use(cors());
app.use(express.json());
app.use('/task', taskRouter);

mongoose.connect(configurations.MONGODB_CONNECTION_STRING)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(configurations.PORT, () => {
        console.log(`Server is running on port ${configurations.PORT}`);
    })
})
.catch(err => {
    console.log(err);
})

app.use(ErrorHandler);