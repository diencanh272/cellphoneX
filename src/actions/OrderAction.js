import { createNewOrder } from '~/services/api/api';
import * as TYPES from '~/utils/constants/Constants';

// API
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
export const actionCreateNewOrderDispatch = (order) => {
    return {
        type: TYPES.CREATE_NEW_ORDER,
        payload: order,
    };
};
