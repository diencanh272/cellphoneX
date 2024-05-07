const initialState = {
    productBuy: [],
    allPayment: '',
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT_BUY':
            return {
                ...state,
                productBuy: action.payload,
            };
        case 'ALL_PRICE_PAYMENT':
            console.log(action.payload);
            return {
                ...state,
                allPayment: action.payload,
            };
        default:
            return state;
    }
};
