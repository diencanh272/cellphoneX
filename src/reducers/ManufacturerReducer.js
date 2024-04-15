import * as TYPES from '~/utils/constants/Constants';

const initialState = [];

export const getAllManufacturerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_MANUFACTURER_LIST:
            state = action.payload;
            return [...state];

        default:
            return [...state];
    }
};
