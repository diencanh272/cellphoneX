import { combineReducers } from 'redux';
import { getAllProductReducer } from './ProductReducer';
import { getAllCategoryReducer } from './CategoryReducer';
import { getAllManufacturerReducer } from './ManufacturerReducer';
import { getAllAccountReducer } from './AccountReducer';
// import { getUserLoginReducer } from './UserLoginReducer';

const rootReducer = combineReducers({
    products: getAllProductReducer,
    categories: getAllCategoryReducer,
    manufacturers: getAllManufacturerReducer,
    accounts: getAllAccountReducer,
    // userLogin: getUserLoginReducer,
});

export default rootReducer;
