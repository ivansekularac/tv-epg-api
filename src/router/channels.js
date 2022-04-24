const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Channels Home page');
});


module.exports = router;