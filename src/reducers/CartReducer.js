import * as TYPES from '~/utils/constants/Constants';

const initialState = {
    listCartWrap: {
        qtt: 0,
        listCart: [],
    },
};

export const getCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ADD_TO_CART:
            state.listCartWrap.qtt = state.listCartWrap.qtt + 1;
            state.listCartWrap.listCart.push(action.payload);
            localStorage.setItem('ProductCart', JSON.stringify(state));
            state = JSON.parse(localStorage.getItem('ProductCart'));
            return { ...state };

        case TYPES.DELETE_PRODUCT_CART:
            return { ...state };

        default:
            return { ...state };
    }
};
