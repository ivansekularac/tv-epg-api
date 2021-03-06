const mongoose = require("mongoose");
require('dotenv').config();

class Database {

    connect() {
        let uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        mongoose
            .connect(uri, {
                useNewUrlParser: true
            })
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.error("Database connection error:" + err);
            });
    }
}

module.exports = Database;