// import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AccuracyPayment.module.scss';
import Button from '~/components/common/Button';
import AllPayment from '~/utils/helpers/AllPayment';
import QttProductsCart from '~/utils/helpers/QttProductsCart';
import { Modal } from 'antd';

const cx = classNames.bind(styles);

function AccuracyPayment() {
    const handleActionPaymentSuccess = () => {
        Modal.success({
            content: 'Đã thanh toán thành công',
            onOk() {
                localStorage.removeItem('ProductCart');
                window.location.reload();
            },
        });
    };

    return (
        <>
            <div className={cx('info-payment')}>
                <div className={cx('info-quote')}>
                    <p>Số lượng sản phẩm</p>
                    {<QttProductsCart />}
                </div>
                <div className={cx('info-quote')}>
                    <p>Tiền hàng tạm tính</p>
                    <span>
                        <AllPayment />
                    </span>
                </div>
                <div className={cx('info-quote')}>
                    <p>Phí vận chuyển</p>
                    <span>0</span>
                </div>

                <div className={cx('info-quote-bottom')}>
                    <p>
                        Tổng tiền<span>(đã gồm VAT)</span>
                    </p>
                    <p>
                        <AllPayment />
                    </p>
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
                    <span>
                        <AllPayment />
                    </span>
                </div>
                <div className={cx('action')}>
                    <Button className={cx('action-buy')} primary onClick={handleActionPaymentSuccess}>
                        Thanh toán
                    </Button>
                    <Button className={cx('action-buy')} text>
                        Kiểm tra danh sách sản phẩm ({<QttProductsCart />})
                    </Button>
                </div>
            </div>
        </>
    );
}

export default AccuracyPayment;
