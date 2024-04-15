import * as TYPES from '~/utils/constants/Constants';
import { getManufacturers } from '~/services/api/api';

//******Call API  Manufacturer
export const actionFetchListManufacturerApi = () => {
    return (dispatch) => {
        return getManufacturers()
            .then((response) => {
                dispatch(actionManufacturerDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

// ******Dispatch
// Dispatch product
export const actionManufacturerDispatch = (manufacturers) => {
    return {
        type: TYPES.FETCH_MANUFACTURER_LIST,
        payload: manufacturers,
    };
};
