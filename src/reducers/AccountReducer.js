import * as TYPES from '~/utils/constants/Constants';

const initialState = [];

export const getAllAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_ACCOUNT_LIST:
            state = action.payload;
            return [...state];

        case TYPES.CREATE_ACCOUNT:
            return [...state, action.payload];

        default:
            return [...state];
    }
};
