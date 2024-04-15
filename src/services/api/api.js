import { default as api } from '../config/config.services';

const urlProduct = '/products';
const urlAccount = '/accounts';
const urlCategories = '/categorys';
const urlManufacturers = '/manufacturers';

// API product
const getProducts = () => {
    return api.get(urlProduct);
};

const getAllProductById = (id) => {
    return api.get(`${urlProduct}/${id}`);
};

const createNewProduct = (body) => {
    return api.post(urlProduct, body);
};

const updateProduct = (id, body) => {
    return api.put(`${urlProduct}/${id}`, body);
};

const deleteProduct = (id) => {
    return api.delete(`${urlProduct}/${id}`);
};

//API Account
const getAccounts = () => {
    return api.get(urlAccount);
};
const createNewAccount = (body) => {
    return api.post(urlAccount, body);
};
const deleteAccount = (id) => {
    return api.delete(`${urlAccount}/${id}`);
};
const updateAccount = (id, body) => {
    return api.put(`${urlAccount}/${id}`, body);
};

//API Categories
const getCategories = () => {
    return api.get(urlCategories);
};

//API Manufacturers
const getManufacturers = () => {
    return api.get(urlManufacturers);
};

export {
    getProducts,
    getAllProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getManufacturers,
    getAccounts,
    createNewAccount,
    deleteAccount,
    updateAccount,
};
