const router = require('express').Router();
const {
    ObjectId
} = require('mongoose').Types
const Channel = require('../models/Channel')
const DateModel = require('../models/Date')
const {
    getCategories
} = require('../utils/helpers')


router.get('', async (req, res) => {
    if (req.query.cid && req.query.from && req.query.to) {

        try {
            let objectId = ObjectId(req.query.cid)

            // Pipeline
            Channel.aggregate([{
                    $match: {
                        _id: objectId
                    }
                },

                {
                    $unwind: "$shows"
                },
                {
                    $match: {
                        "shows.start_ts": {
                            $gte: parseInt(req.query.from),
                            $lte: parseInt(req.query.to)
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        title: "$shows.title",
                        category: "$shows.category",
                        description: "$shows.description",
                        start_dt: "$shows.start_dt",
                        end_dt: "$shows.end_dt",
                        start_ts: "$shows.start_ts",
                        end_ts: "$shows.end_ts",
                        duration: "$shows.duration",
                        poster: "$shows.poster",
                        channel: {
                            name: "$name",
                            logo: "$logo"
                        }

                    }
                }
            ]).exec().then(results => {
                res.status(200).json(results)
            }).catch(err => {
                res.json({
                    message: err
                })
            })
        } catch (err) {
            res.status(400).json({
                message: "Bad request 🤕"
            })
        }
    }

});

router.get('/dates', async (_, res) => {
    DateModel.find().exec().then(dates => {
        res.json(dates)
    }).catch(err => {
        res.json({
            message: err
        })
    });
});

router.get('/featured', async (_, res) => {

    // get current unix  timestamp
    const now = Math.floor(Date.now() / 1000)
    // Hardcode channels and categories we want
    // TODO: Handpick these below
    const channels = ["HBO HD", "Arena PREMIUM 1", "Fox", "SK 1 HD (SR)"]
    const categories = ["Fudbal", "Košarka", "Tenis", "Bioskopski film", "Tv-serijali"]


    Channel.aggregate(
        [{
                $unwind: "$shows"
            },
            {
                $match: {
                    "shows.start_ts": {
                        $gte: now,
                        $lte: now + 180 * 60
                    },
                    "name": {
                        $in: channels
                    },
                    "shows.category": {
                        $in: categories
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: "$shows.title",
                    category: "$shows.category",
                    description: "$shows.description",
                    start_dt: "$shows.start_dt",
                    end_dt: "$shows.end_dt",
                    start_ts: "$shows.start_ts",
                    end_ts: "$shows.end_ts",
                    duration: "$shows.duration",
                    poster: "$shows.poster",
                    channel: {
                        name: "$name",
                        logo: "$logo"
                    }

                }
            }
        ]
    ).exec().then(results => {
        res.status(200).json(results)
    }).catch(err => {
        res.send(500).json({
            message: err
        })
    })
});


router.get('/:category', async (req, res) => {

    allowed = ["sports", "movies", "series"]


    if (!allowed.includes(req.params.category)) {
        return res.status(400).json({
            message: `Category ${req.params.category} not found! 😭`
        })
    }

    if ((req.query.from == null || req.query.from == "") || (req.query.to == null || req.query.to == "")) {
        return res.status(400).json({
            message: "Bad request 🤕"
        })
    }

    categorization = getCategories(req.params.category)

    Channel.aggregate(
        [{
                $unwind: "$shows"
            },
            {
                $match: {
                    "shows.start_ts": {
                        $gte: parseInt(req.query.from),
                        $lte: parseInt(req.query.to)
                    },
                    "shows.category": {
                        $in: categorization
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: "$shows.title",
                    category: "$shows.category",
                    description: "$shows.description",
                    start_dt: "$shows.start_dt",
                    end_dt: "$shows.end_dt",
                    start_ts: "$shows.start_ts",
                    end_ts: "$shows.end_ts",
                    duration: "$shows.duration",
                    poster: "$shows.poster",
                    channel: {
                        name: "$name",
                        logo: "$logo"
                    }

                }
            }
        ]
    ).exec().then(results => {
        res.status(200).json(results)
    }).catch(err => {
        res.send(500).json({
            message: err
        })
    })

});


module.exports = router;