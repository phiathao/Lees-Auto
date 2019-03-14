const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET DATA
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT 
            first_name, 
            last_name, 
            phone,
            street,
            city,
            state,
            zip,
            customers.id AS id, 
            vehicle.id AS vehicle_id, 
            make, 
            model, 
            plate, 
            color
        FROM "customers"
        FULL OUTER JOIN "vehicle" 
        ON "vehicle".customer_id = "customers".id
        GROUP BY customers.id, vehicle_id;
    `;
    pool.query(queryString)
        .then(result => {
            let customer = {};
            result.rows.forEach(row => {
                let { id, first_name, last_name, phone, street, city, state, zip, ...vehicle } = row;

                if (customer[row.id]) {

                    if (vehicle.vehicle_id) {
                        customer[row.id].vehicles.push(vehicle);
                    }

                } else {
                    customer[row.id] = {
                        id,
                        first_name,
                        last_name,
                        phone,
                        street,
                        city,
                        state,
                        zip,
                        vehicles: vehicle.vehicle_id ? [vehicle] : []
                    };
                }
            });
            res.send(Object.values(customer));
        }).catch(error => {
            console.log(error)
            res.sendStatus(500);
        })
});
// GET all vehicles
router.get('/vehicles', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT 

            vehicle.id AS vehicle_id, 
            make, 
            model, 
            plate, 
            color, 
            other,
            to_char("year", 'YYYY') AS "year",
            receipts.payment_method,
            receipts.date, 
            receipts.description, 
            receipts.due, 
            receipts.id as receipt_id, 
            customers.id AS customer_id,
            first_name,
            last_name

        FROM "vehicle"
        FULL OUTER JOIN "receipts" 
        ON "vehicle".id = "receipts".vehicle_id
        FULL OUTER JOIN "customers"
        ON "vehicle".customer_id = "customers".id
        GROUP BY vehicle.id, receipts.id, customers.id;
    `;
    pool.query(queryString)
        .then(result => {
            let vehicle = {};
            result.rows.forEach(row => {
                let { vehicle_id, make, model, year, plate, color, other, customer_id, first_name, last_name, ...receipt } = row;
                
                if (vehicle_id) {
                    if (vehicle[row.vehicle_id]) {

                        if (receipt.receipt_id) {
                            vehicle[row.vehicle_id].receipts.push(receipt);
                        }

                    } else {
                        vehicle[row.vehicle_id] = {
                            vehicle_id,
                            make,
                            model,
                            plate,
                            color,
                            other,
                            year,
                            customer_id,
                            first_name,
                            last_name,
                            receipts: receipt.receipt_id ? [receipt] : []
                        };
                    }
                }
            });
            res.send(Object.values(vehicle));
        }).catch(error => {
            console.log(error)
            res.sendStatus(500);
        })
});

// GET receipt info
router.get('/get/receipt/:id/', rejectUnauthenticated, (req, res) => {

    const queryString = `
        SELECT *
        FROM "receipts"
        WHERE "receipts".id = $1;
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
            res.sendStatus(200);
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
router.post('/add/customer', rejectUnauthenticated, (req, res) => {
    const queryString = `
        INSERT INTO "customers" ("first_name", "last_name", "phone", "street", "city", "state", "zip") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    pool.query(queryString, [req.body.first_name, req.body.last_name, req.body.phone, req.body.street, req.body.city, req.body.state, req.body.zip])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
        })
});

// POST new vehicle
router.post('/add/vehicle', rejectUnauthenticated, (req, res) => {
    const queryString = `
        INSERT INTO "vehicle" ("make", "model", "year", "plate", "color", "other", "customer_id") 
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    pool.query(queryString, [req.body.make, req.body.model, `1-1-${req.body.year}`, req.body.plate, req.body.color, req.body.other, req.body.customer_id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
        })
});

// DELETE customer
router.delete('/delete/customer/:id', rejectUnauthenticated, (req, res) => {
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
router.delete('/delete/vehicle/:id', rejectUnauthenticated, (req, res) => {
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

// DELETE RECEIPTS
router.delete('/delete/receipt/:id', rejectUnauthenticated, (req, res) => {
    const queryString = `
        DELETE FROM "receipts" WHERE "id" = $1;
    `;
    pool.query(queryString, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
        })
});


module.exports = router;