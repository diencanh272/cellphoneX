import * as TYPES from '~/utils/constants/Constants';

const initialState = [];

export const getAllCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_CATEGORY_LIST:
            state = action.payload;
            return [...state];

        default:
            return [...state];
    }
};
