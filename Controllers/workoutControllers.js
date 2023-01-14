const Workout = require('../Models/workoutsModel');
const mongoose = require('mongoose');


// Get All Workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({createdAt: -1});
    res.status(200).json(workouts);
}


// Get a single Workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: "No such Workout"})
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: "No Such Workout"})
    }

    res.status(200).json(workout);
}


// Create a new Workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    // Error Message
    const emptyFields = [];

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // Add Documents to Database
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, load, reps, user_id });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


// Delete a Workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: "No such Workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if (!workout) {
        return res.status(400).json({error: "No Such Workout"})
    }

    res.status(200).json(workout);
}


// Update a Workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: "No such Workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!workout) {
        return res.status(400).json({error: "No Such Workout"})
    }

    res.status(200).json(workout);
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}