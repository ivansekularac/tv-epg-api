const express = require('express')
require('dotenv').config()
const channels = require('./router/channels')
const app = express()
const PORT = process.env.PORT || 5000
const DB = require("./services/database");

app.use(express.json())

// Register routers
app.use('/api/channels', channels)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`)
})