import axios from "axios";
const baseURL = "/api/persons";

export const getAll = () => {
  return axios.get(baseURL);
};

export const create = (newObj) => {
  return axios.post(baseURL, newObj);
};

export const deleteOne = (val) => {
  return axios.delete(`${baseURL}/${val}`);
};

export const update = (id, updateObj) => {
  return axios.put(`${baseURL}/${id}`, updateObj);
};
