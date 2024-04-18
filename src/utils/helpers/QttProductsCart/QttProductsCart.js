import classNames from 'classnames/bind';

import styles from './QttProductsCart.module.scss';

const cx = classNames.bind(styles);

function QttProductsCart() {
    const productsInductCart = JSON.parse(localStorage.getItem('ProductCart'));
    // console.log(productsInductCart);

    return <span className={cx('qtt-product')}>{productsInductCart.listCartWrap.qtt}</span>;
}

export default QttProductsCart;
