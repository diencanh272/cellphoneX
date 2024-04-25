import * as TYPES from '~/utils/constants/Constants';
import { createNewManufacturers, deleteManufacturers, getManufacturers, updateManufacturers } from '~/services/api/api';

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

export const actionCreateManufacturerApi = (manu) => {
    return (dispatch) => {
        return createNewManufacturers(manu)
            .then((response) => {
                console.log('Thêm mới Manufacturer thành công!');
                dispatch(actionManufacturerDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

export const actionDeleteManufacturerApi = (id) => {
    return (dispatch) => {
        return deleteManufacturers(id)
            .then((response) => {
                console.log('Xóa Manufacturer thành công!');
                dispatch(actionDeleteManufacturerDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};
export const actionUpdateManufacturerApi = (id, updateManu) => {
    return (dispatch) => {
        return updateManufacturers(id, updateManu)
            .then((response) => {
                dispatch(actionUpdateManufacturerDispatch(response));
                console.log('Cập nhật thành công!');
                console.log(response);
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

export const actionDeleteManufacturerDispatch = (id) => {
    return {
        type: TYPES.DELETE_MANUFACTURER,
        payload: id,
    };
};

export const actionUpdateManufacturerDispatch = (manu) => {
    return {
        type: TYPES.UPDATE_MANUFACTURER,
        payload: manu,
    };
};
