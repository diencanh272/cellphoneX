import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import Button from '~/components/common/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { Modal } from 'antd';
import AllPayment from '~/utils/helpers/AllPayment';
import { actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function CartItem() {
    const dispatch = useDispatch();

    const accounts = useSelector((state) => state.accounts);
    const products = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);
    let accountLoginId;
    if (localStorage && localStorage.getItem('AccountId')) {
        accountLoginId = JSON.parse(localStorage.getItem('AccountId'));
    }

    let getAccountLogin = accounts.find((acc) => acc.id === accountLoginId);
    let getCartAccountLogin;
    if (getAccountLogin && getAccountLogin.carts) {
        getCartAccountLogin = getAccountLogin.carts;
    }
    // console.log(getCartAccountLogin);

    // const increaseQuantity = (index) => {
    //     const updatedQuantityItem = [...getCartAccountLogin];
    //     updatedQuantityItem[index].quantity += 1;
    //     updateAccount(accountLoginId,{...account,})
    // };

    // const decreaseQuantity = (index) => {
    //     const updatedCart = [...getCartAccountLogin];
    //     if (updatedCart[index].quantity > 1) {
    //         updatedCart[index].quantity -= 1;
    //     }
    // };

    //Delete Product cart start
    // const success = (id) => {
    //     Modal.success({
    //         content: 'Xoá sản phẩm khỏi giỏ hàng',
    //         onOk() {
    //             dispatch(actionRemoveCartItemApi(id));
    //         },
    //         onCancel() {},
    //     });
    // };

    // const handleDeleteProductCart = (id) => {
    //     success(id);
    // };
    //Delete Product cart end
    let productBuy = [];

    const RenderListProductInCart = () =>
        getCartAccountLogin &&
        getCartAccountLogin.map((cartItem, index) => {
            const product = products.find((product) => product.id === cartItem.cartItemId);
            const priceQtt = { price: product.price, quantity: cartItem.quantity };
            productBuy.push(priceQtt);
            if (!product) return null;

            return (
                <div key={index} className={cx('item')}>
                    <div className={cx('checkbox-product')}>
                        <input type="checkbox" id={`item${index}`} />
                        <label htmlFor={`item${index}`}>
                            <img className={cx('thumbs')} src={product.imageName} alt="" />
                        </label>
                    </div>
                    <div className={cx('info-wrap')}>
                        <div className={cx('info-product')}>
                            <Link className={cx('name-product', 'line-clamp')}>
                                <h3>{product.name}</h3>
                            </Link>
                            {/* <Button
                                rightIcon={<FontAwesomeIcon icon={faTrash} />}
                                onClick={() => handleDeleteProductCart(cartItem.id)}
                            /> */}
                        </div>
                        <div className={cx('price-product')}>
                            <div className={cx('price-block')}>
                                <span className={cx('price-current')}>{`${product.price}₫`}</span>
                            </div>
                            <div className={cx('price-action')}>
                                {/* <Button
                                    onClick={() => decreaseQuantity(index)}
                                    className={cx('minus', { disabled: cartItem.quantity === 1 })}
                                >
                                    -
                                </Button> */}
                                <input type="text" readOnly value={cartItem.quantity} />
                                {/* <Button onClick={() => increaseQuantity(index)} className={cx('plus')}>
                                    +
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

    return (
        <>
            {getCartAccountLogin && getCartAccountLogin.length === 0 ? (
                <span className={cx('cart-empty')}>Không có sản phẩm nào trong giỏ hàng</span>
            ) : (
                <div className={cx('list-cart')}>
                    <div className={cx('select-all')}>
                        <input type="checkbox" id="checkAll" />
                        <label htmlFor="checkAll">Chọn tất cả</label>
                    </div>

                    <div className={cx('product-list')}>
                        <RenderListProductInCart />
                    </div>

                    <div className={cx('price-temp-wrap')}>
                        <div className={cx('price-temp')}>
                            <p>Tạm tính</p>
                            <span>{<AllPayment cart={productBuy} />}</span>
                        </div>

                        <div className={cx('action-buy')}>
                            <Button primary to={'/cart/info-payment'}>
                                Mua ngay
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CartItem;
