const router = require('express').Router();
const {
    ObjectId
} = require('mongoose').Types
const Channel = require('../models/schemas');

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

module.exports = router;