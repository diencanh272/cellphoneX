import * as TYPES from '~/utils/constants/Constants';

const initialState = [];

export const getAllCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_CATEGORY_LIST:
            state = action.payload;
            return [...state];

        case TYPES.DELETE_CATEGORY:
            let idDeletePayload = action.payload;
            let newState = [...state];
            let idDelete = newState.findIndex((category) => category.id === idDeletePayload);
            newState.splice(idDelete, 1);

            return newState;

        case TYPES.UPDATE_CATEGORY:
            let updatedCategory = action.payload;
            let indexToUpdate = state.findIndex((category) => category.id === updatedCategory.id);
            let updatedState = [...state];
            if (indexToUpdate !== -1) {
                updatedState[indexToUpdate] = updatedCategory;
            }
            return updatedState;

        default:
            return [...state];
    }
};
