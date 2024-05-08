import { combineReducers } from 'redux';
import { getAllProductReducer } from './ProductReducer';
import { getAllCategoryReducer } from './CategoryReducer';
import { getAllManufacturerReducer } from './ManufacturerReducer';
import { getAllAccountReducer } from './AccountReducer';
import { cartReducer } from './CartReducer';
import { orderReducer } from './OrderReducer';

const rootReducer = combineReducers({
    products: getAllProductReducer,
    categories: getAllCategoryReducer,
    manufacturers: getAllManufacturerReducer,
    accounts: getAllAccountReducer,
    carts: cartReducer,
    orders: orderReducer,
});

export default rootReducer;
