import * as TYPES from '~/utils/constants/Constants';

export const actionOrderSuccess = (order) => {
    return {
        type: TYPES.ORDER,
        payload: order,
    };
};
