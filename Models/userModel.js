const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
});

// Static Signup Method
userSchema.statics.signup = async function(email, password) {
    // Validator
    if (!email || !password) {
        throw Error('All field must be filled!');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid!')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough!')
    }

    // Check Email
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email Already in use');
    }

    // Bcrypt Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create User
    const user = await this.create({ email, password: hash });
    return user;
}

// Static Login Method
userSchema.statics.login =  async function (email, password) {
    // Check Field
    if (!email || !password) {
        throw Error('All field must be filled!');
    }

    // Check Email
    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect Email!');
    }

    // Check Password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect Password!')
    }

    return user;
}


module.exports = mongoose.model('User', userSchema);