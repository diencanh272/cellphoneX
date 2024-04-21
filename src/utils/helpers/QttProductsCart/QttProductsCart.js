import classNames from 'classnames/bind';

import styles from './QttProductsCart.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function QttProductsCart() {
    let dataCart = {
        qtt: 0,
        listCart: [],
    };

    dataCart = useSelector((state) => state.cart);
    // console.log(dataCart);
    // if (localStorage && localStorage.getItem('ProductCart')) {
    //     dataCart = JSON.parse(localStorage.getItem('ProductCart'));
    // }
    let totalQtt = 0;
    dataCart.listCartWrap.listCart.map((product) => {
        return (totalQtt = totalQtt + product.quantity);
    });

    return <span className={cx('qtt-product')}>{totalQtt}</span>;
}

export default QttProductsCart;
