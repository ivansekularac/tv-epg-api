require('dotenv').config()
const express = require('express')
const channels = require('./router/channels')
const shows = require('./router/shows')

const Database = require("./services/database");
const PORT = process.env.PORT || 5000;

// Initialize the app
const app = express()
// Initialize connection to database
const db = new Database();
db.connect();

// Register middleware
app.use(express.json())

// Register routers
app.use('/api/v1/channels', channels)
app.use('/api/v1/shows', shows)


app.get('/', (_, res) => {
    res.json({
        message: 'This endpoint is a ghost town 👻'
    })
})

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`)
})