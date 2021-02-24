import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseURL).then(res => res.data);

const create = (newObject) => axios.post(baseURL, newObject).then(res => res.data);

const remove = (id, newObject) => axios.delete(`${baseURL}/${id}`, newObject).then(res => res.data);

const update = (id, newObject) => axios.put(`${baseURL}/${id}`, newObject).then(res => res.data);

const personService = { getAll, create, remove, update };

export default personService;