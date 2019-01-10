const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET DATA
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT "customers".id, "first_name", "last_name", "vehicle".id AS "vehicle_id", "make", "model", to_char("year", 'YYYY') AS "year"
        FROM "customers"
        LEFT JOIN "vehicle" ON "vehicle".customer_id = "customers".id;
    `;
    pool.query(queryString)
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});
// GET customer
router.get('/customer/:id', rejectUnauthenticated, (req, res) => {
    console.log('in get customer id');
    const queryString = `
        SELECT "customers".id, "first_name", "last_name", "phone", "street", "city", "state", "zip"
        FROM "customers"
        WHERE "customers".id = $1;
    `;
    pool.query(queryString, [req.params.id])
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});

// POST new customer
router.post('/add/customer', (req, res) => {
    const queryString = `
        INSERT INTO "customers" ("first_name", "last_name", "phone", "street", "city", "state", "zip") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    pool.query(queryString, [req.body.first_name, req.body.last_name, req.body.phone, req.body.street, req.body.city, req.body.state, req.body.zip])
    .then(result => {
        res.sendStatus(200);
    }).catch(error =>{
        res.sendStatus(500);
    })
});

// DELETE customer
router.delete('/delete/customer/:id', (req, res) => {
    const queryString = `
        DELETE FROM "customers" WHERE "id" = $1;
    `;
    pool.query(queryString, [req.params.id])
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500);
    })
});
// DELETE vehicle
router.delete('/delete/vehicle/:id', (req, res) => {
    const queryString = `
        DELETE FROM "vehicle" WHERE "id" = $1;
    `;
    pool.query(queryString, [req.params.id])
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        res.sendStatus(500);
    })
});


module.exports = router;