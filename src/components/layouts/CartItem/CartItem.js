import classNames from 'classnames/bind';

import styles from './CartItem.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionDeleteProductCart } from '~/actions/CartAction';

const cx = classNames.bind(styles);

function CartItem() {
    const [buyMore, setBuyMore] = useState(1);
    const dispatch = useDispatch();

    const handleActionMinus = () => {
        if (buyMore >= 2) {
            setBuyMore(buyMore - 1);
        }
    };

    const handleActionPlus = () => {
        setBuyMore(buyMore + 1);
    };

    const handleDeleteProductCart = (id) => {
        dispatch(actionDeleteProductCart(id));
    };

    const dataCart = JSON.parse(localStorage.getItem('ProductCart'));
    const listProductInCart = dataCart.listCartWrap.listCart;
    // console.log(listProductInCart);

    const renderListProductInCart = listProductInCart.map((cartItem, index) => {
        return (
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
                            onClick={handleDeleteProductCart(cartItem.id)}
                        ></Button>
                    </div>
                    <div className={cx('price-product')}>
                        <div className={cx('price-block')}>
                            <span className={cx('price-current')}>100$</span>
                            <span className={cx('price-old')}>{cartItem.price}</span>
                        </div>
                        <div className={cx('price-action')}>
                            <Button className={cx('minus', { disabled: buyMore === 1 })} onClick={handleActionMinus}>
                                -
                            </Button>
                            <input type="text" readOnly value={buyMore} />
                            <Button className={cx('plus')} onClick={handleActionPlus}>
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return <>{renderListProductInCart}</>;
}

export default CartItem;
