const {
    createPrescription,
    getPatientPrescriptions,
    getDoctorPrescriptions
} = require("../models/prescriptionModel");


// CREATE PRESCRIPTION
const addPrescription = (req, res) => {

    const doctor_id = req.user.id;

    const {
        patient_id,
        medicines,
        diagnosis,
        notes
    } = req.body;

    createPrescription(
        doctor_id,
        patient_id,
        medicines,
        diagnosis,
        notes,
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Prescription Created"
            });
        }
    );
};


// PATIENT VIEW
const patientPrescriptions = (req, res) => {

    const patient_id = req.user.id;

    getPatientPrescriptions(
        patient_id,
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);
        }
    );
};


// DOCTOR VIEW
const doctorPrescriptions = (req, res) => {

    const doctor_id = req.user.id;

    getDoctorPrescriptions(
        doctor_id,
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);
        }
    );
};

module.exports = {
    addPrescription,
    patientPrescriptions,
    doctorPrescriptions
};