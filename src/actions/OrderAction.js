import { createNewOrder, getOrders } from '~/services/api/api';
import * as TYPES from '~/utils/constants/Constants';

// API

export const actionFetchListOrderAPI = () => {
    return (dispatch) => {
        return getOrders()
            .then((response) => {
                dispatch(actionOrderDispatch(response));
                // console.log(response);
            })
            .catch((error) => {
                return error;
            });
    };
};

export const actionCreateNewOrderAPI = (order) => {
    return (dispatch) => {
        return createNewOrder(order)
            .then((response) => {
                console.log('Tạo mới Order thành công!!!');
                console.log(response);
                dispatch(actionCreateNewOrderDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

//Dispatch

export const actionOrderDispatch = (orders) => {
    return {
        type: TYPES.FETCH_ORDER_LIST,
        payload: orders,
    };
};
export const actionCreateNewOrderDispatch = (order) => {
    return {
        type: TYPES.CREATE_NEW_ORDER,
        payload: order,
    };
};
