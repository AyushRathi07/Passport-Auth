var mongoose = require("mongoose");

var blogSchema = mongoose.Schema({
    title: {
        type: String,
        min: 5,
        max: 20,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true} );

module.exports = mongoose.model('Blog', blogSchema);
