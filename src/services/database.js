const mongoose = require("mongoose");
require('dotenv').config();

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        let uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        mongoose
            .connect(uri, {
                useNewUrlParser: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.error("Database connection error:" + err);
            });
    }
}

module.exports = new Database();