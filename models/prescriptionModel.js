const db = require("../config/db");



const createPrescription = (
    doctor_id,
    patient_id,
    medicines,
    diagnosis,
    notes,
    callback
) => {

    const sql = `
        INSERT INTO prescriptions
        (doctor_id, patient_id, medicines, diagnosis, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [doctor_id, patient_id, medicines, diagnosis, notes],
        callback
    );
};



const getPatientPrescriptions = (
    patient_id,
    callback
) => {

    const sql = `
        SELECT * FROM prescriptions
        WHERE patient_id = ?
    `;

    db.all(sql, [patient_id], callback);
};



const getDoctorPrescriptions = (
    doctor_id,
    callback
) => {

    const sql = `
        SELECT * FROM prescriptions
        WHERE doctor_id = ?
    `;

    db.all(sql, [doctor_id], callback);
};

module.exports = {
    createPrescription,
    getPatientPrescriptions,
    getDoctorPrescriptions
};
