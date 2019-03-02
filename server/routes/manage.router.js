const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET DATA
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryString = `
    SELECT first_name, last_name, customers.id AS id, vehicle.id AS vehicle_id, make, model, plate, color
        FROM "customers"
        FULL OUTER JOIN "vehicle" 
        ON "vehicle".customer_id = "customers".id
        GROUP BY customers.id, vehicle_id;
    `;
    pool.query(queryString)
        .then(result => {
            let customer = {};
            result.rows.forEach(row => {
                let { id, first_name, last_name, ...vehicle } = row;

                if (customer[row.id]) {

                    if (vehicle.vehicle_id) {
                        customer[row.id].vehicles.push(vehicle);
                    }
                    
                } else {
                    customer[row.id] = {
                        id,
                        first_name,
                        last_name,
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

// GET vehicle receipts
router.get('/get/vehicle/:id/receipts', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT "id", "vehicle_id", "payment_method", to_char("date", 'MM-DD-YYYY') AS "date", "description", "due"
        FROM "receipts"
        WHERE "vehicle_id" = $1
        ORDER BY "id" DESC;
    `;
    pool.query(queryString, [req.params.id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log(error)
            res.sendStatus(500);
        })
});

// GET receipt info
router.get('/get/receipt/:id/', rejectUnauthenticated, (req, res) => {
    const queryString = `
        SELECT "receipts".id AS "receipt_id", "receipts".vehicle_id, "receipts".payment_method, to_char("receipts".date, 'MM-DD-YYYY') AS "date", "receipts".description, "receipts".due, "service_receipt".service_id, "services".service_type, "services".amount, "service_receipt".id
        FROM "receipts"
        LEFT JOIN "service_receipt" ON "service_receipt".receipt_id = "receipts".id
        LEFT JOIN "services" ON "services".id = "service_receipt".service_id
        WHERE "receipts".id = $1
        ORDER BY "services".id DESC;
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