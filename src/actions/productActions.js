// src/actions/productActions.js
import {
  getProducts as fetchProductsApi,
  createProduct as createProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
} from '../services/api';

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const data = await fetchProductsApi();
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    const data = await createProductApi(product);
    dispatch({ type: 'CREATE_PRODUCT_SUCCESS', payload: data });
    dispatch(fetchProducts());
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    await updateProductApi(id, product);
    dispatch(fetchProducts());
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await deleteProductApi(id);
    dispatch(fetchProducts());
  } catch (error) {
    console.error(error);
  }
};
