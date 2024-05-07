// import { addToCart, getAllCarts, removeCartItem, updateCartItem } from '~/services/api/api';
// import * as TYPES from '~/utils/constants/Constants';

// // API
// export const actionFetchListCartApi = () => {
//     return (dispatch) => {
//         return getAllCarts()
//             .then((response) => {
//                 dispatch(actionFetchListCartDispatch(response));
//             })
//             .catch((error) => {
//                 return error;
//             });
//     };
// };

// export const actionAddToCartApi = (accountId, cartItem) => {
//     return (dispatch) => {
//         return addToCart(accountId, cartItem)
//             .then((response) => {
//                 console.log('Thêm mới sản phẩm thành công!!!');
//                 console.log(response);
//                 dispatch(actionAddToCartDispatch(response));
//             })
//             .catch((error) => {
//                 return error;
//             });
//     };
// };

// export const actionRemoveCartItemApi = (id) => {
//     return (dispatch) => {
//         return removeCartItem(id)
//             .then((response) => {
//                 dispatch(actionRemoveFromCartDispatch(response));
//                 console.log('Xoá sản phẩm khỏi giỏ hàng thành công!!!');
//             })
//             .catch((error) => {
//                 return error;
//             });
//     };
// };

// export const actionUpdateCartItemQuantityApi = (accountId, cartItemId, newQuantity) => {
//     const updatedItem = { quantityItem: newQuantity };
//     return (dispatch) => {
//         return updateCartItem(accountId, cartItemId, updatedItem)
//             .then((response) => {
//                 dispatch(actionUpdateCartItemQuantityDispatch(accountId, cartItemId, newQuantity));
//                 console.log('Cập nhật số lượng sản phẩm trong giỏ hàng thành công!!!');
//                 console.log(response);
//             })
//             .catch((error) => {
//                 return error;
//             });
//     };
// };

// // Dispatch
// export const actionFetchListCartDispatch = (carts) => ({
//     type: TYPES.FETCH_CART_LIST,
//     payload: carts,
// });

// export const actionAddToCartDispatch = (accountId) => ({
//     type: TYPES.ADD_TO_CART,
//     payload: accountId,
// });

// export const actionUpdateCartItemQuantityDispatch = (accountId, cartItemId, newQuantity) => ({
//     type: TYPES.UPDATE_CART_ITEM_QUANTITY,
//     payload: { accountId, cartItemId, newQuantity },
// });

// export const actionRemoveFromCartDispatch = (accountId, cartItemId) => ({
//     type: TYPES.REMOVE_FROM_CART,
//     payload: { accountId, cartItemId },
// });

export const addProductBuy = (products) => ({
    type: 'ADD_PRODUCT_BUY',
    payload: products,
});

export const allPricePayment = (allPayment) => ({
    type: 'ALL_PRICE_PAYMENT',
    payload: allPayment,
});
