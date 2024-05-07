// import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AccuracyPayment.module.scss';
import Button from '~/components/common/Button';
import AllPayment from '~/utils/helpers/AllPayment';
import QttProductsCart from '~/utils/helpers/QttProductsCart';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateNewOrderAPI } from '~/actions/OrderAction';
import { useNavigate } from 'react-router-dom';
import { actionFetchListAccountApi, actionRemoveToCartDispatch } from '~/actions/AccountAction';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function AccuracyPayment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    let productBuyPrice = [];
    let productBuyInfo = [];

    getCartAccountLogin &&
        getCartAccountLogin.map((cartItem, index) => {
            const product = products.find((product) => product.id === cartItem.cartItemId);
            const priceQtt = { price: product.price, quantity: cartItem.quantity };
            const nameQtt = { name: product.name, quantity: cartItem.quantity };
            productBuyInfo.push(nameQtt);
            return productBuyPrice.push(priceQtt);
        });

    let formAddress = {};

    if (localStorage && localStorage.getItem('FormAddress')) {
        formAddress = JSON.parse(localStorage.getItem('FormAddress'));
    }

    // console.log(formAddress);
    // console.log(account);
    // console.log(productCart);

    const productBuy = productBuyInfo.map((prd) => {
        return {
            quantity: prd.quantity,
            productName: prd.name,
        };
    });
    // console.log(productBuy);

    const add = `${formAddress.apartment}, ${formAddress.selectedWard}, ${formAddress.selectedDistrict}, ${formAddress.selectedProvince}`;

    const infoOrder = {
        accountId: getAccountLogin.id,
        note: formAddress.note,
        address: add,
        fullname: getAccountLogin.fullname,
        phone: getAccountLogin.mobile,
        productBuy: productBuy,
    };

    const handleActionPaymentSuccess = () => {
        Modal.success({
            content: 'Đã thanh toán thành công',
            onOk() {
                dispatch(actionCreateNewOrderAPI(infoOrder));
                dispatch(actionRemoveToCartDispatch(accountLoginId));

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
                        <AllPayment cart={productBuyPrice} />
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
                        <AllPayment cart={productBuyPrice} />
                    </p>
                </div>
            </div>

            <div className={cx('delivery')}>
                <p>Thông tin người nhận</p>
                <div className={cx('info-payment')}>
                    <div className={cx('info-quote')}>
                        <p>Khách hàng</p>
                        <span>{getAccountLogin.fullname}</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Số điện thoại</p>
                        <span>{getAccountLogin.mobile}</span>
                    </div>
                    <div className={cx('info-quote')}>
                        <p>Email</p>
                        <span>{getAccountLogin.email}</span>
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
                        <AllPayment cart={productBuyPrice} />
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
