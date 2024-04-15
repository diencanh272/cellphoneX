import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import CartItem from '~/components/layouts/CartItem';

const cx = classNames.bind(styles);

function Cart() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('row')}>
                <div className={cx('offset-3', 'col-6')}>
                    <div className={cx('top')}>
                        <Button to={'/'} leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}></Button>
                        <p className={cx('title')}> Giỏ hàng của bạn</p>
                    </div>
                    <div className={cx('tab-cart')}>
                        <Button primary className={cx('tab-btn')}>
                            Giỏ hàng
                        </Button>
                    </div>
                    <div className={cx('list-cart')}>
                        <div className={cx('select-all')}>
                            <input type="checkbox" id="checkAll" />
                            <label htmlFor="checkAll">Chọn tất cả</label>
                        </div>
                        <div className={cx('list-product')}>
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </div>
                    </div>
                </div>
                <div className={cx('price-temp-wrap')}>
                    <div className={cx('price-temp')}>
                        <p>Tạm tính</p>
                        <span>0đ</span>
                    </div>

                    <div className={cx('action-buy')}>
                        <Button primary to={'/cart/payment'}>
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
