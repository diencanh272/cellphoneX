import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListProductApi } from '~/actions/ProductAction';
// import StarRating from '~/utils/helpers/StarRating/StarRating';

const cx = classNames.bind(styles);

function ProductCard() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
    }, [dispatch]);
    // Sử dụng map để render mỗi sản phẩm ra giao diện
    const renderedProducts = products.map((product) => (
        <div key={product.id} className={cx('col')}>
            <article className={cx('wrap')}>
                <div className={cx('img-wrap')}>
                    <Link to={'/detail'}>
                        <img className={cx('thumb')} src={product.imageName} alt={product.name} />
                    </Link>
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('name', 'line-clamp')}>
                        <Link to={'/detail'}>{product.name}</Link>
                    </h3>
                    <div className={cx('price')}>
                        <span className={cx('current')}>{product.price}</span>
                        <span className={cx('old')}>{product.price}</span>
                    </div>
                    <div className={cx('rating')}>
                        <span className={cx('star')}></span>
                        <Button className={cx('like')} rightIcon={<FontAwesomeIcon icon={faHeart} />}>
                            Yêu thích
                        </Button>
                    </div>
                </div>
            </article>
        </div>
    ));

    return <>{renderedProducts}</>;
}

export default ProductCard;
