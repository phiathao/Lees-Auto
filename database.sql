CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "services" (
	"id" SERIAL PRIMARY KEY,
	"service_type" VARCHAR(255),
	"description" VARCHAR(255),
	"is_highlighted" BOOLEAN DEFAULT FALSE,
	"ammount" FLOAT default 0.00,
	"img_url" VARCHAR(255)
);

INSERT INTO "services" ("service_type", "description", "ammount", "img_url")
VALUES ( 'Oil Change', 'something something something', 30.99, 'https://www.earnhardtcjd.com/assets/misc/13803/854074.jpg'),
('Change Tire', 'something tire', 0, 'https://i5.walmartimages.com/asr/be7fe7d2-358b-4b2b-afdb-7ada30aa70ef_1.38f74b57d1c13ca278cdfbb45405b4b4.jpeg');

CREATE TABLE "customers" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(25),
	"last_name" VARCHAR(25),
	"phone" VARCHAR(10),
	"street" VARCHAR(50),
	"city" VARCHAR(50),
	"state" VARCHAR(2),
	"zip" VARCHAR(5)
);

CREATE TABLE "vehicle" (
	"id" SERIAL PRIMARY KEY,
	"customer_id" INT REFERENCES "customers",
	"make" VARCHAR(50),
	"model" VARCHAR(50),
	"year" DATE,
	"plate" VARCHAR(25),
	"color" VARCHAR(15),
	"other" VARCHAR(100)
);

CREATE TABLE "receipts" (
	"id" SERIAL PRIMARY KEY,
	"vehicle_id" INT REFERENCES "vehicle",
	"payment_method" VARCHAR(50),
	"date" DATE,
	"description" VARCHAR(255),
	"due" FLOAT
);

CREATE TABLE "service_receipt" (
	"id" SERIAL PRIMARY KEY,
	"service_id" INT REFERENCES "services",
	"receipt_id" INT REFERENCES "receipts"
);

INSERT INTO "customers" ("first_name", "last_name", "phone", "street", "city", "state", "zip") VALUES ('John', 'Doe', '5554443333', '123 Abc St N.', 'Spring', 'MN', '55411');

INSERT INTO "vehicle" ("customer_id", "make", "model", "year", "plate", "color", "other")
VALUES ('1', 'Toyota', 'Camry', '1-1-2010', '552M-LP2', 'Blue', '');

INSERT INTO "receipts" ("vehicle_id", "payment_method", "date", "description", "due")
VALUES ('1', 'DEBIT', '1-1-2019', 'customer ask to look at tire tread also', '29.99');

INSERT INTO "service_receipt" ("service_id", "receipt_id")
VALUES ('1', '1');

SELECT CONCAT("first_name", ' ', "last_name") AS "full_name", "make", "model", "due", "date", "receipts".description, "service_type", "service_id", "receipt_id" FROM "customers"
JOIN "vehicle" ON "vehicle".customer_id = "customers".id
JOIN "receipts" ON "receipts".vehicle_id = "vehicle".id
JOIN "service_receipt" ON "service_receipt".receipt_id = "receipts".id
JOIN "services" ON "services".id = "service_receipt".service_id;

SELECT *, CONCAT("first_name", ' ', "last_name") AS "full_name"
FROM "customers"
JOIN "vehicle" ON "vehicle".customer_id = "customers".id
JOIN "receipts" ON "receipts".vehicle_id = "vehicle".id
JOIN "service_receipt" ON "service_receipt".receipt_id = "receipts".id
JOIN "services" ON "services".id = "service_receipt".service_id;