const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true,
    },
    password: String,
    registered_at: { type: Date, default: Date.now()},
    superuser: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema)

module.exports = { User }
