require('dotenv').config()
const express = require('express')
const channels = require('./router/channels')

const DB = require("./services/database");
const PORT = process.env.PORT || 5000;

// Initialize the app
const app = express()

// Register middleware
app.use(express.json())

// Register routers
app.use('/api/channels', channels)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`)
})