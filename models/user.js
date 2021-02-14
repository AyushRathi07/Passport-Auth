var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 20,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user','admin','member'],
        default: 'user'
    }
});

module.exports = mongoose.model('User', userSchema);
