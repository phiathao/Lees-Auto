const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// GET FEATURE
router.get('/feature', (req, res) => {
    const queryString = `
        SELECT *
        FROM "services"
        WHERE "is_highlighted" = true;
    `;
    pool.query(queryString)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log(error)
            res.sendStatus(500);
        })
});

// GET SERVICE
router.get('/services', (req, res) => {
    const queryString = `
        SELECT *
        FROM "services"
    `;
    pool.query(queryString)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log(error)
            res.sendStatus(500);
        })
});


module.exports = router;