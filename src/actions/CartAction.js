import * as TYPES from '~/utils/constants/Constants';

export const actionAddToCart = (product) => {
    return {
        type: TYPES.ADD_TO_CART,
        payload: product,
    };
};

export const actionDeleteProductCart = (id) => {
    return {
        type: TYPES.DELETE_PRODUCT_CART,
        payload: id,
    };
};
