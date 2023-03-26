// External imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// Internal imports
const { notFoundHandler, errorHandler} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");

const app = express();
dotenv.config();

//database connection
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Connection Success!');
    })
    .catch((err) => console.log(err));

    // request parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Set up view engine
    app.set("view engine", "ejs");

    // Set static folder
    app.use(express.static(path.join(__dirname, "public")));

    // parse cookie
    app.use(cookieParser(process.env.COOKIE_SECRET));

    // routing setup
    app.use('/', loginRouter);
    // app.use('/users', usersRouter);
    // app.use('/inbox', inboxRouter);

    // Not found Handling
    app.use(notFoundHandler);

    // common error handling
    app.use(errorHandler);

    // Server run
    // Note: To kill port command: fuser -k -n tcp 5000
    app.listen(process.env.PORT,()=>{
        console.log(`Server runing on:: ${process.env.PORT} port`);
    })