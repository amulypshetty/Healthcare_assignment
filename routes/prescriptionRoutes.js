const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const {
    addPrescription,
    patientPrescriptions,
    doctorPrescriptions
} = require("../controllers/prescriptionController");



router.post(
    "/create",
    verifyToken,
    authorizeRole("doctor"),
    addPrescription
);



router.get(
    "/patient",
    verifyToken,
    authorizeRole("patient"),
    patientPrescriptions
);



router.get(
    "/doctor",
    verifyToken,
    authorizeRole("doctor"),
    doctorPrescriptions
);

module.exports = router;
