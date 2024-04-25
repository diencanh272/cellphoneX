import { default as api } from '../config/config.services';

const urlProduct = '/products';
const urlAccount = '/accounts';
const urlCategories = '/categories';
const urlManufacturers = '/manufacturers';

// API product
const getProducts = () => {
    return api.get(urlProduct);
};

const getProductById = (id) => {
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
const createNewCategory = (body) => {
    return api.post(urlCategories, body);
};
const deleteCategory = (id) => {
    return api.delete(`${urlCategories}/${id}`);
};
const updateCategory = (id, body) => {
    return api.put(`${urlCategories}/${id}`, body);
};

//API Manufacturers
const getManufacturers = () => {
    return api.get(urlManufacturers);
};
const createNewManufacturers = (body) => {
    return api.post(urlManufacturers, body);
};
const deleteManufacturers = (id) => {
    return api.delete(`${urlManufacturers}/${id}`);
};
const updateManufacturers = (id, body) => {
    return api.put(`${urlManufacturers}/${id}`, body);
};

export {
    //product
    getProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
    //cate
    getCategories,
    createNewCategory,
    deleteCategory,
    updateCategory,
    //manu
    getManufacturers,
    createNewManufacturers,
    deleteManufacturers,
    updateManufacturers,
    //account
    getAccounts,
    createNewAccount,
    deleteAccount,
    updateAccount,
};
