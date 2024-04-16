import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

function ProductDetail({ productProps }) {
    console.log(productProps);
    return <div className={cx('detail')}>Product Detail</div>;
}

export default ProductDetail;
