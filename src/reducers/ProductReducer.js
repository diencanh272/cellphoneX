import * as TYPES from '~/utils/constants/Constants';

const initialState = [];

export const getAllProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_PRODUCT_LIST:
            state = action.payload.content;
            return [...state];

        case TYPES.DELETE_PRODUCT:
            let idDeletePayload = action.payload;
            let listProductState = [...state];
            let idDelete = listProductState.findIndex((product) => product.id === idDeletePayload);
            listProductState.splice(idDelete, 1);
            // console.log(listProductState);
            return listProductState;

        case TYPES.UPDATE_PRODUCT:
            let updatedProduct = action.payload;
            let indexToUpdate = state.findIndex((product) => product.id === updatedProduct.id);
            let updatedState = [...state];
            if (indexToUpdate !== -1) {
                updatedState[indexToUpdate] = updatedProduct;
            }
            return updatedState;

        default:
            return [...state];
    }
};
