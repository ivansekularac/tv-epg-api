const mongoose = require('mongoose');

const DateSchema = mongoose.Schema({
    date_tz: {
        type: Date,
    },
    timestamp: {
        type: Number,
    },
    weekday: {
        type: String,
    },
    month: {
        type: String,
    },
    day: {
        type: Number,
    },
});

module.exports = mongoose.model("Date", DateSchema, "date");