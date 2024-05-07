import classNames from 'classnames/bind';

import styles from './QttProductsCart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function QttProductsCart() {
    let totalQtt = 0;
    const accounts = useSelector((state) => state.accounts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);
    let accountLoginId;
    if (localStorage && localStorage.getItem('AccountId')) {
        accountLoginId = JSON.parse(localStorage.getItem('AccountId'));
    }

    let getAccountLogin = accounts.find((acc) => acc.id === accountLoginId);
    // console.log(getCartAccountLogin);
    if (getAccountLogin && getAccountLogin.carts) {
        getAccountLogin.carts.map((item) => (totalQtt += item.quantity));
    }

    return <span className={cx('qtt-product')}>{totalQtt}</span>;
}

export default QttProductsCart;
