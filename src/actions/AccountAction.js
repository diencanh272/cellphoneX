import * as TYPES from '~/utils/constants/Constants';
import { createNewAccount, getAccounts } from '~/services/api/api';

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
            .then((response, status) => {
                console.log('Tạo mới tài khoản thành công!!!');
                // console.log(response);
                dispatch(actionCreateNewAccountDispatch(response));
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
