const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET DATA
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT "customers".id, "first_name", "last_name", "vehicle".id AS "vehicle_id", "make", "model", to_char("year", 'YYYY') AS "year"
        FROM "customers"
        LEFT JOIN "vehicle" ON "vehicle".customer_id = "customers".id
        ORDER BY "customers".id ASC;
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
router.get('/get/customer/:id', rejectUnauthenticated, (req, res) => {
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
// Get customer's vehicles
router.get('/get/customer/:id/vehicles', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT "vehicle".id, "make", "model", to_char("year", 'YYYY') AS "year", "plate", "color", "other"
        FROM "vehicle"
        WHERE "vehicle".customer_id = $1
        ORDER BY "vehicle".id ASC;
    `;
    pool.query(queryString, [req.params.id])
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});

// GET vehicle
router.get('/get/vehicle/:id', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT "vehicle".id, "vehicle".customer_id, "make", "model", to_char("year", 'YYYY') AS "year", "plate", "color", "other"
        FROM "vehicle"
        WHERE "vehicle".id = $1
        ORDER BY "vehicle".id ASC;
    `;
    pool.query(queryString, [req.params.id])
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});

// PUT customer
router.put('/put/customer/', rejectUnauthenticated, (req, res) => {
    const queryString = `
        UPDATE "customers"
        SET "first_name" = $1, "last_name" = $2, "phone" = $3, "street" = $4, "city" = $5, "state" = $6, "zip" = $7
        WHERE "id" = $8; 
    `;
    pool.query(queryString, [req.body.first_name, req.body.last_name, req.body.phone, req.body.street, req.body.city, req.body.state, req.body.zip, req.body.id])
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error)
        res.sendStatus(500);
    })
});

// PUT Vehicle
router.put('/put/vehicle/', rejectUnauthenticated, (req, res) => {
    const queryString = `
        UPDATE "vehicle"
        SET "make" = $1, "model" = $2, "year" = $3, "plate" = $4, "color" = $5, "other" = $6
        WHERE "id" = $7; 
    `;
    pool.query(queryString, [req.body.make, req.body.model, `1-1-${req.body.year}`, req.body.plate, req.body.color, req.body.other, req.body.id])
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

// POST new vehicle
router.post('/add/vehicle', (req, res) => {
    const queryString = `
        INSERT INTO "vehicle" ("make", "model", "year", "plate", "color", "other", "customer_id") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    pool.query(queryString, [req.body.make, req.body.model, req.body.year, req.body.plate, req.body.color, req.body.other, req.body.customer_id])
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