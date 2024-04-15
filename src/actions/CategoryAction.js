import * as TYPES from '~/utils/constants/Constants';
import { getCategories } from '~/services/api/api';

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

// ******Dispatch
// Dispatch product
export const actionCategoryDispatch = (categories) => {
    return {
        type: TYPES.FETCH_CATEGORY_LIST,
        payload: categories,
    };
};
