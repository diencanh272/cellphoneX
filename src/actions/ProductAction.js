import * as TYPES from '~/utils/constants/Constants';
import { createNewProduct, deleteProduct, getProductById, getProducts, updateProduct } from '~/services/api/api';

//******Call API(thunk) product

//get product
export const actionFetchListProductApi = () => {
    return (dispatch) => {
        return getProducts()
            .then((response) => {
                dispatch(actionProductDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

//get product by id
export const actionGetProductByIdApi = (productId) => {
    return (dispatch) => {
        return getProductById(productId)
            .then((response) => {
                console.log('get product by id true');
                dispatch(actionGetProductByIdDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

//delete product
export const actionDeleteProductApi = (productId) => {
    return (dispatch) => {
        return deleteProduct(productId)
            .then((response) => {
                dispatch(actionDeleteProductDispatch(productId));
            })
            .catch((error) => {
                return error;
            });
    };
};

//create product
export const actionCreateProductApi = (product) => {
    return (dispatch) => {
        return createNewProduct(product)
            .then((response) => {
                console.log('Thêm mới thành công');
                // console.log(response);
                dispatch(actionProductDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

//update product
export const actionUpdateProductApi = (productId, updatedProduct) => {
    return (dispatch) => {
        return updateProduct(productId, updatedProduct)
            .then((response) => {
                dispatch(actionUpdateProductDispatch(response));
                console.log('Cập nhật thành công!');
                console.log(response);
            })
            .catch((error) => {
                return error;
            });
    };
};

// ******Dispatch action
export const actionProductDispatch = (products) => {
    return {
        type: TYPES.FETCH_PRODUCT_LIST,
        payload: products,
    };
};

export const actionGetProductByIdDispatch = (products) => {
    return {
        type: TYPES.GET_PRODUCT_BY_ID,
        payload: products,
    };
};

export const actionDeleteProductDispatch = (productId) => {
    return {
        type: TYPES.DELETE_PRODUCT,
        payload: productId,
    };
};

export const actionUpdateProductDispatch = (prd) => {
    return {
        type: TYPES.UPDATE_PRODUCT,
        payload: prd,
    };
};
