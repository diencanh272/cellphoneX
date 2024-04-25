// import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AccuracyPayment.module.scss';
import Button from '~/components/common/Button';
import AllPayment from '~/utils/helpers/AllPayment';
import QttProductsCart from '~/utils/helpers/QttProductsCart';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { actionOrderSuccess } from '~/actions/OrderAction';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccuracyPayment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let account = {};
    let formAddress = {};
    let dataCart = {};
    if (localStorage && localStorage.getItem('Account')) {
        account = JSON.parse(localStorage.getItem('Account'));
    }
    if (localStorage && localStorage.getItem('FormAddress')) {
        formAddress = JSON.parse(localStorage.getItem('FormAddress'));
    }

    if (localStorage && localStorage.getItem('ProductCart')) {
        dataCart = JSON.parse(localStorage.getItem('ProductCart'));
    }

    // console.log(formAddress);
    // console.log(account);
    // console.log(productCart);

    const productBuy = dataCart.listCart.map((prd) => {
        return {
            quantity: prd.quantity,
            productName: prd.name,
        };
    });

    const add = `${formAddress.apartment}, ${formAddress.selectedWard}, ${formAddress.selectedDistrict}, ${formAddress.selectedProvince}`;

    const infoOrder = {
        id: account.id,
        note: formAddress.note,
        address: add,
        fullname: account.fullname,
        phone: account.mobile,
        productBuy: productBuy,
    };
    // console.log(infoOrder);

    const handleActionPaymentSuccess = () => {
        Modal.success({
            content: 'Đã thanh toán thành công',
            onOk() {
                dispatch(actionOrderSuccess(infoOrder));
                localStorage.removeItem('ProductCart');
                setTimeout(() => {
                    navigate('/order');
                }, 1000);
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
                <p>Thông tin người nhận</p>
                <div className={cx('info-payment')}>
                    <div className={cx('info-quote')}>
                        <p>Khách hàng</p>
                        <span>{account.fullname}</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Số điện thoại</p>
                        <span>{account.mobile}</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Email</p>
                        <span>{account.email}</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Nhận hàng tại</p>
                        <span>{add}</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Ghi chú</p>
                        <span>{formAddress.note}</span>
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
