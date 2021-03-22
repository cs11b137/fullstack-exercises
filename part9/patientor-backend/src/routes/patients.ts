import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSsnEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientService.create(newPatient);

        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;