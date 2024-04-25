// Redux reducer
import * as TYPES from '~/utils/constants/Constants';

const initialState = {};

export const getOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.ORDER:
            let newState = {};
            localStorage.setItem('Order', JSON.stringify(action.payload));
            if (localStorage && localStorage.getItem('Order')) {
                newState = JSON.parse(localStorage.getItem('Order'));
            }
            state = { ...state, newState };
            return state;

        default:
            return state;
    }
};
