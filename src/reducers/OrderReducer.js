import * as TYPES from '~/utils/constants/Constants';

const initialState = {
    orders: [],
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.CREATE_NEW_ORDER:
            const newOrder = {
                order: action.payload,
            };
            return {
                ...state,
                orders: [...state.orders, newOrder],
            };
        default:
            return state;
    }
};
