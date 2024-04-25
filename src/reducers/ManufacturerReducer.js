import * as TYPES from '~/utils/constants/Constants';

const initialState = [];

export const getAllManufacturerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_MANUFACTURER_LIST:
            state = action.payload;
            return [...state];

        case TYPES.DELETE_MANUFACTURER:
            let idDeletePayload = action.payload;
            let newState = [...state];
            let idDelete = newState.findIndex((manu) => manu.id === idDeletePayload);
            newState.splice(idDelete, 1);
            return newState;

        case TYPES.UPDATE_MANUFACTURER:
            let updatedManu = action.payload;
            let indexToUpdate = state.findIndex((product) => product.id === updatedManu.id);
            let updatedState = [...state];
            if (indexToUpdate !== -1) {
                updatedState[indexToUpdate] = updatedManu;
            }
            return updatedState;

        default:
            return [...state];
    }
};
