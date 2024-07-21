import axios from "axios";

const baseUrl = '/api/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const create = newPerson => {
	const request = axios.post(baseUrl, newPerson);
	return request.then(response => response.data);
};

const remove = personId => {
	return axios.delete(`${baseUrl}/${personId}`);
};

const replaceNumber = (personId, alteredPerson) => {
	const request = axios.put(`${baseUrl}/${personId}`, alteredPerson);
	return request.then(response => response.data);
};

export default {
	getAll,
	create,
	remove,
	replaceNumber,
};
