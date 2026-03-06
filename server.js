const express = require("express");
const connection = require('./utils/db');
const userRouter = require('./routes/user.router');

const app = express();

app.use(express.json());

connection();

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('app is listening');
});
