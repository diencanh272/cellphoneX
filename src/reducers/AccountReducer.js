// reducers.js
import { updateAccount } from '~/services/api/api';
import * as TYPES from '~/utils/constants/Constants';

const initialState = [];

export const getAllAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.FETCH_ACCOUNT_LIST:
            state = action.payload;
            return [...state];

        case TYPES.CREATE_ACCOUNT:
            let newAccount = action.payload;
            updateAccount(newAccount.id, { ...newAccount, carts: [] });
            localStorage.setItem('AccountId', JSON.stringify(newAccount.id));
            return [...state, { ...newAccount }];

        case TYPES.DELETE_ACCOUNT:
            let idDelete = action.payload;
            let listAccount = [...state];
            let idAccountDelete = state.findIndex((acc) => acc.id === idDelete);
            listAccount.splice(idAccountDelete, 1);
            return listAccount;

        case TYPES.UPDATE_ACCOUNT:
            let updatedAccount = action.payload;
            let indexToUpdate = state.findIndex((account) => account.id === updatedAccount.id);
            let updatedState = [...state];
            if (indexToUpdate !== -1) {
                updatedState[indexToUpdate] = updatedAccount;
            }
            return updatedState;

        case TYPES.ADD_TO_CART:
            const { accountId, cartItem } = action.payload;
            console.log(action.payload);

            const updatedAccounts = state.map((account) => {
                if (account.id === accountId) {
                    let updatedCart;
                    // Kiểm tra  tồn tại
                    const existingCartItemIndex = account.carts.findIndex(
                        (item) => item.cartItemId === cartItem.cartItemId,
                    );

                    if (existingCartItemIndex !== -1) {
                        //  tồn tại, cập nhật số lượng
                        updatedCart = account.carts.map((item, index) =>
                            index === existingCartItemIndex
                                ? { ...item, quantity: item.quantity + cartItem.quantity }
                                : item,
                        );
                        console.log(updatedCart);
                    } else {
                        // chưa tồn tại, thêm mới
                        updatedCart = [...account.carts, cartItem];
                        console.log(updatedCart);
                    }
                    // Gọi API cập nhật tài khoản
                    updateAccount(accountId, { ...account, carts: updatedCart })
                        .then((response) => {
                            console.log('Cập nhật giỏ hàng thành công!');
                            console.log(response);
                        })
                        .catch((error) => {
                            console.error('Lỗi khi cập nhật giỏ hàng:', error);
                        });

                    return { ...account, carts: updatedCart };
                } else {
                    return account;
                }
            });

            return updatedAccounts;

        case TYPES.REMOVE_FROM_CART:
            const accountIdToRemove = action.payload;
            const updatedStateCart = state.map((account) =>
                account.id === accountIdToRemove
                    ? {
                          ...account,
                          carts: [],
                      }
                    : account,
            );
            const accountToUpdate = state.find((account) => account.id === accountIdToRemove);
            updateAccount(accountIdToRemove, { ...accountToUpdate, carts: [] })
                .then((response) => {
                    console.log('Cập nhật giỏ hàng thành công !');
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });

            return updatedStateCart;

        default:
            return [...state];
    }
};
