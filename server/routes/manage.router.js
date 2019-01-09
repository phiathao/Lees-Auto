const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT "customers".id, "first_name", "last_name", "vehicle".id AS "vehicle_id", "make", "model", to_char("year", 'YYYY') AS "year"
        FROM "customers"
        JOIN "vehicle" ON "vehicle".customer_id = "customers".id;
    `;
    pool.query(queryString)
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;