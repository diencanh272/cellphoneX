import { combineReducers } from 'redux';
import { getAllProductReducer } from './ProductReducer';
import { getAllCategoryReducer } from './CategoryReducer';
import { getAllManufacturerReducer } from './ManufacturerReducer';
import { getAllAccountReducer } from './AccountReducer';
import { getCartReducer } from './CartReducer';
import { getOrderReducer } from './OrderReducer';

const rootReducer = combineReducers({
    products: getAllProductReducer,
    categories: getAllCategoryReducer,
    manufacturers: getAllManufacturerReducer,
    accounts: getAllAccountReducer,
    cart: getCartReducer,
    order: getOrderReducer,
});

export default rootReducer;
