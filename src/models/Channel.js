const mongoose = require('mongoose');

const ChannelSchema = mongoose.Schema({
    channel_id: {
        type: Number,
        required: true,
        unique: true,
    },
    original_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: false,
    }
});

module.exports = mongoose.model("Channel", ChannelSchema, "channel");