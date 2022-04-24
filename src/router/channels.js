const router = require('express').Router();
const Channel = require('../models/schemas');

router.get('/', async (req, res) => {
    Channel.find().select('-shows').exec().then(channels => {
        res.json(channels);
    }).catch(err => {
        res.json({
            message: err
        })
    });
});

router.get('/get/:id', async (req, res) => {
    Channel.findOne({
        channel_id: req.params.id
    }).exec().then(channel => {
        if (!channel) {
            res.json({
                message: 'Channel not found'
            });
        }
        res.json(channel);
    }).catch(err => {
        res.json({
            message: err
        })
    });
});

router.get('/categories', async (req, res) => {
    Channel.distinct('category').exec().then(categories => {
        res.json(categories);
    }).catch(err => {
        res.json({
            message: err
        })
    });
});

router.get('/category/:category', async (req, res) => {
    Channel.find({
        category: req.params.category
    }).select('-shows').exec().then(channels => {
        if (channels.length === 0) {
            res.json({
                message: 'No channels found in this category'
            });
        }
        res.json(channels);
    }).catch(err => {
        res.json({
            message: err
        })
    });
});


module.exports = router;