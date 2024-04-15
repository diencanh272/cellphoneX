// import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import CartItem from '~/components/layouts/CartItem';
// import FormInfoCustomer from '~/components/layouts/FormInfo/FormInfoCustomer';
// import FormAddress from '~/components/layouts/FormAddress';

const cx = classNames.bind(styles);

function Payment() {
    // const GetInfoCustomer = () => (
    //     <>
    //         <div className={cx('listBuy')}>
    //             <CartItem />
    //         </div>
    //         <div className={cx('customer')}>
    //             <p>Thông tin khách hàng</p>
    //             <FormInfoCustomer />
    //         </div>
    //         <div className={cx('delivery')}>
    //             <p>Thông tin nhận hàng</p>
    //             <FormAddress />
    //         </div>
    //         <div className={cx('total')}>
    //             <div className={cx('total-price')}>
    //                 <p>Tổng tiền: </p>
    //                 <span>100$</span>
    //             </div>
    //             <div className={cx('action')}>
    //                 <Button className={cx('action-buy')} primary>
    //                     Tiếp tục
    //                 </Button>
    //             </div>
    //         </div>
    //     </>
    // );

    const Payment = () => (
        <>
            <div className={cx('info-payment')}>
                <div className={cx('info-quote')}>
                    <p>Số lượng sản phẩm</p>
                    <span>01</span>
                </div>
                <div className={cx('info-quote')}>
                    <p>Tiền hàng tạm tính</p>
                    <span>100$</span>
                </div>
                <div className={cx('info-quote')}>
                    <p>Phí vận chuyển</p>
                    <span>1$</span>
                </div>

                <div className={cx('info-quote-bottom')}>
                    <p>
                        Tổng tiền<span>(đã gồm VAT)</span>
                    </p>
                    <p>101$</p>
                </div>
            </div>

            <div className={cx('delivery')}>
                <p>Thông tin nhận hàng</p>
                <div className={cx('info-payment')}>
                    <div className={cx('info-quote')}>
                        <p>Khách hàng</p>
                        <span>Diel Can</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Số điện thoại</p>
                        <span>+84336686626</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Email</p>
                        <span>email@gmail.com</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Nhận hàng tại</p>
                        <span>1, Xã Hoàng Diệu, Huyện Chương Mỹ, Hà Nội</span>
                    </div>
                </div>
            </div>
            <div className={cx('total')}>
                <div className={cx('total-price')}>
                    <p>Tổng tiền: </p>
                    <span>101$</span>
                </div>
                <div className={cx('action')}>
                    <Button className={cx('action-buy')} primary>
                        Thanh toán
                    </Button>
                    <Button className={cx('action-buy')} text>
                        Kiểm tra danh sách sản phẩm (1)
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <div className={cx('wrap')}>
            <div className={cx('row')}>
                <div className={cx('offset-3', 'col-6')}>
                    <div className={cx('top')}>
                        <Button to={'/cart'} leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}></Button>
                        <p className={cx('title')}>Thông tin</p>
                    </div>
                    <div className={cx('nav')}>
                        <div className={cx('nav-item')}>
                            <span>1. THÔNG TIN</span>
                        </div>
                        <div className={cx('nav-item', 'active')}>
                            <span>2. THANH TOÁN</span>
                        </div>
                    </div>

                    <Payment />
                </div>
            </div>
        </div>
    );
}

export default Payment;
