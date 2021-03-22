import { NewPatientEntry } from '../types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const checkField = (value: any) => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing comment: ' + value);
    }

    return value;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: checkField(object.name),
        dateOfBirth: checkField(object.dateOfBirth),
        ssn: checkField(object.ssn),
        gender: object.gender,
        occupation: checkField(object.occupation)
    };

    return newEntry;
};

export default toNewPatientEntry;