// Redux reducer
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
            const newState = { ...state };

            const existingProductIndex = newState.listCartWrap.listCart.findIndex(
                (product) => product.id === action.payload.id,
            );

            if (existingProductIndex !== -1) {
                newState.listCartWrap.listCart[existingProductIndex].quantity += 1;
            } else {
                newState.listCartWrap.listCart.push({ ...action.payload, quantity: 1 });
            }

            newState.listCartWrap.qtt = newState.listCartWrap.listCart.reduce(
                (total, product) => total + product.quantity,
                0,
            );
            localStorage.setItem('ProductCart', JSON.stringify(newState.listCartWrap));

            return newState;

        case TYPES.DELETE_PRODUCT_CART:
            const filteredList = state.listCartWrap.listCart.filter((product) => product.id !== action.payload);
            const newCart = {
                ...state.listCartWrap,
                listCart: filteredList,
                qtt: filteredList.reduce((total, product) => total + product.quantity, 0),
            };

            localStorage.setItem('ProductCart', JSON.stringify(newCart));

            return { ...state, listCartWrap: newCart };

        default:
            return state;
    }
};
