const mongoose = require('mongoose');


const ShowSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    start_dt: {
        type: Date,
        required: true,
    },
    end_dt: {
        type: Date,
        required: true,
    },
    start_ts: {
        type: Number,
        required: true,
    },
    end_ts: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    poster: {
        type: String,
        required: false,
    },
    oid: {
        type: Number,
        required: true,
    }
});

const ChannelSchema = mongoose.Schema({
    oid: {
        type: Number,
        required: true,
        unique: true,
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
    },
    shows: [ShowSchema],
});

module.exports = mongoose.model("Channel", ChannelSchema, "channel");