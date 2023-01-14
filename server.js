// Requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const workoutRoute = require('./Routes/workouts');
const userRoute = require('./Routes/user');
const mongoose = require('mongoose');


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

// Router
app.use('/api/workouts', workoutRoute);
app.use('/api/user', userRoute);

// Connect With MongoDB
mongoose.connect(process.env.DB)
.then(() => {console.log('DB is Connected')})
.catch((error) => {console.log(error)})


// LISTENING TO THE APP
app.listen(process.env.PORT, () => {
    console.log(`App is listening to PORT 4000`);
});