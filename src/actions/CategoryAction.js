import * as TYPES from '~/utils/constants/Constants';
import { createNewCategory, deleteCategory, getCategories, updateCategory } from '~/services/api/api';

//******Call API  Category
export const actionFetchListCategoryApi = () => {
    return (dispatch) => {
        return getCategories()
            .then((response) => {
                dispatch(actionCategoryDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

export const actionCreateCategoryApi = (category) => {
    return (dispatch) => {
        return createNewCategory(category)
            .then((response) => {
                console.log('Thêm mới Category thành công!');
                dispatch(actionCategoryDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

export const actionDeleteCategoryApi = (id) => {
    return (dispatch) => {
        return deleteCategory(id)
            .then((response) => {
                console.log('Xóa Category thành công!');
                dispatch(actionDeleteCategoryDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};
export const actionUpdateCategoryApi = (id, UpdateCategory) => {
    return (dispatch) => {
        return updateCategory(id, UpdateCategory)
            .then((response) => {
                dispatch(actionUpdateCategoryDispatch(response));
                console.log('Cập nhật thành công!');
                console.log(response);
            })
            .catch((error) => {
                return error;
            });
    };
};

// ******Dispatch
// Dispatch product
export const actionCategoryDispatch = (categories) => {
    return {
        type: TYPES.FETCH_CATEGORY_LIST,
        payload: categories,
    };
};

export const actionDeleteCategoryDispatch = (id) => {
    return {
        type: TYPES.DELETE_CATEGORY,
        payload: id,
    };
};

export const actionUpdateCategoryDispatch = (category) => {
    return {
        type: TYPES.UPDATE_CATEGORY,
        payload: category,
    };
};
