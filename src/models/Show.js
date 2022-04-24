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
    channel_id: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Show", ShowSchema, "show");