const router = require('express').Router();
const Channel = require('../models/schemas');

router.get('/', async (req, res) => {
    res.send("Shows Home");
});

module.exports = router;