const router = require('express').Router();
const Show = require('../models/Show');
const {
    generateDates
} = require('../utils/helpers');

router.get('/dates', async (req, res) => {
    Show.aggregate([{
        $group: {
            _id: null,
            min: {
                $min: '$start_dt'
            },
            max: {
                $max: '$start_dt'
            }
        }
    }]).then(dates => {
        res.json(generateDates(dates[0].min, dates[0].max));
    }).catch(err => {
        res.json(err);
    });
});

router.get('/categories', async (req, res) => {
    Show.distinct('category').exec().then(categories => {
        res.json(categories);
    }).catch(err => {
        res.json({
            message: err
        })
    });
});

router.get('', async (req, res) => {
    // Check if there are query params to and from
    if (req.query.cid && req.query.from && req.query.to) {

        // fetch all shows between the dates for channel id
        Show.find({
            channel_id: req.query.cid,
            start_ts: {
                $gte: req.query.from,
                $lte: req.query.to
            }
        }).then(shows => {
            res.json(shows);
        }).catch(err => {
            res.json(err);
        });

    } else {
        res.json({
            message: "Missing query params 🤕"
        });
    }
});

module.exports = router;