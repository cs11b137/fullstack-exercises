import * as uuid from 'uuid';
import patients from '../../data/patients';
import { PatientEntry, NonSsnPatientEntry, NewPatientEntry } from '../types';

const id: string = uuid.v1();

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSsnEntries = (): NonSsnPatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const create = (entry: NewPatientEntry ): PatientEntry => {
    const newPatient = {
        ...entry,
        id,
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSsnEntries,
    create
};