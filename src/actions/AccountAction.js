import * as TYPES from '~/utils/constants/Constants';
import { createNewAccount, deleteAccount, getAccounts, updateAccount } from '~/services/api/api';

//******Call API  Account
export const actionFetchListAccountApi = () => {
    return (dispatch) => {
        return getAccounts()
            .then((response) => {
                dispatch(actionAccountDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

export const actionCreateNewAccountApi = (account) => {
    return (dispatch) => {
        return createNewAccount(account)
            .then((response) => {
                console.log('Tạo mới tài khoản thành công!!!');
                console.log(response);
                dispatch(actionCreateNewAccountDispatch(response));
            })
            .catch((error) => {
                return error;
            });
    };
};

export const actionDeleteAccountApi = (id) => {
    return (dispatch) => {
        return deleteAccount(id)
            .then((response) => {
                dispatch(actionDeleteAccountDispatch(response));
                console.log('Xóa tài khoản thành công!!!');
                // console.log(response);
            })
            .catch((error) => {
                return error;
            });
    };
};

export const actionUpdateAccountApi = (id, updatedAccount) => {
    return (dispatch) => {
        return updateAccount(id, updatedAccount)
            .then((response) => {
                dispatch(actionUpdateAccountDispatch(response));
                console.log('Sửa tài khoản thành công!!!');
                console.log(response);
            })
            .catch((error) => {
                return error;
            });
    };
};

// ******Dispatch payload
// Dispatch
export const actionAccountDispatch = (accounts) => {
    return {
        type: TYPES.FETCH_ACCOUNT_LIST,
        payload: accounts,
    };
};

export const actionCreateNewAccountDispatch = (accounts) => {
    return {
        type: TYPES.CREATE_ACCOUNT,
        payload: accounts,
    };
};

export const actionDeleteAccountDispatch = (id) => {
    return {
        type: TYPES.DELETE_ACCOUNT,
        payload: id,
    };
};

export const actionUpdateAccountDispatch = (acc) => {
    return {
        type: TYPES.UPDATE_ACCOUNT,
        payload: acc,
    };
};

export const actionAddToCartDispatch = (accountId, cartItem) => {
    return {
        type: TYPES.ADD_TO_CART,
        payload: { accountId, cartItem },
    };
};

export const actionRemoveToCartDispatch = (id) => {
    return {
        type: TYPES.REMOVE_FROM_CART,
        payload: id,
    };
};
