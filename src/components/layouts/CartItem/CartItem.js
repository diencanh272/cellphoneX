import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { actionDeleteProductCart } from '~/actions/CartAction';
import { Modal } from 'antd';
import AllPayment from '~/utils/helpers/AllPayment';

const cx = classNames.bind(styles);

function CartItem() {
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (localStorage && localStorage.getItem('ProductCart')) {
            const dataCart = JSON.parse(localStorage.getItem('ProductCart'));
            setCartItems(dataCart.listCart);
        }
    }, []);

    const increaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setCartItems(updatedCart);
            updateLocalStorage(updatedCart);
        }
    };

    const updateLocalStorage = (cart) => {
        const updatedDataCart = { ...localStorage.getItem('ProductCart'), listCart: cart };
        localStorage.setItem('ProductCart', JSON.stringify(updatedDataCart));
    };

    const success = () => {
        Modal.success({
            content: 'Xoá sản phẩm khỏi giỏ hàng',
        });
    };

    const handleDeleteProductCart = (id) => {
        dispatch(actionDeleteProductCart(id));
        success();
    };

    const RenderListProductInCart = () =>
        cartItems.map((cartItem, index) => (
            <div key={index} className={cx('item')}>
                <div className={cx('checkbox-product')}>
                    <input type="checkbox" id={`item${index}`} />
                    <label htmlFor={`item${index}`}>
                        <img className={cx('thumbs')} src={cartItem.imageName} alt="" />
                    </label>
                </div>
                <div className={cx('info-wrap')}>
                    <div className={cx('info-product')}>
                        <Link className={cx('name-product', 'line-clamp')}>
                            <h3>{cartItem.name}</h3>
                        </Link>
                        <Button
                            rightIcon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={() => handleDeleteProductCart(cartItem.id)}
                        />
                    </div>
                    <div className={cx('price-product')}>
                        <div className={cx('price-block')}>
                            <span className={cx('price-old')}>{`${cartItem.price}₫`}</span>
                        </div>
                        <div className={cx('price-action')}>
                            <Button
                                onClick={() => decreaseQuantity(index)}
                                className={cx('minus', { disabled: cartItem.quantity === 1 })}
                            >
                                -
                            </Button>
                            <input type="text" readOnly value={cartItem.quantity} />
                            <Button onClick={() => increaseQuantity(index)} className={cx('plus')}>
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        ));

    return (
        <>
            {cartItems.length === 0 ? (
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
                            <span>{<AllPayment />}</span>
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
