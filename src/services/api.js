// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://reactjr.coderslab.online/api/';

export const getProducts = () => axios.get(`${API_BASE_URL}products`);
export const createProduct = (product) => axios.post(`${API_BASE_URL}products`, product);
export const updateProduct = (id, product) => axios.put(`${API_BASE_URL}products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}products/${id}`);

export const getOrders = () => axios.get(`${API_BASE_URL}orders`);
export const createOrder = (order) => axios.post(`${API_BASE_URL}orders`, order);
export const updateOrder = (id, order) => axios.put(`${API_BASE_URL}orders/${id}`, order);
export const deleteOrder = (id) => axios.delete(`${API_BASE_URL}orders/${id}`);
