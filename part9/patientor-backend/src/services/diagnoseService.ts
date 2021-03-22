import diagnoses from '../../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
    return diagnoses;
};

export default {
    getEntries
};