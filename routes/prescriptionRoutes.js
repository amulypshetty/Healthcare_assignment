const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const {
    addPrescription,
    patientPrescriptions,
    doctorPrescriptions
} = require("../controllers/prescriptionController");


// DOCTOR CREATE
router.post(
    "/create",
    verifyToken,
    authorizeRole("doctor"),
    addPrescription
);


// PATIENT VIEW
router.get(
    "/patient",
    verifyToken,
    authorizeRole("patient"),
    patientPrescriptions
);


// DOCTOR VIEW
router.get(
    "/doctor",
    verifyToken,
    authorizeRole("doctor"),
    doctorPrescriptions
);

module.exports = router;