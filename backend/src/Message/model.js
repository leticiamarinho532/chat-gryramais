const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
});


module.exports = mongoose.model('message', messageSchema);