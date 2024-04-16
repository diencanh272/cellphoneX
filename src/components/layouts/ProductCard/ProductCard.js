import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListProductApi } from '~/actions/ProductAction';
// import StarRating from '~/utils/helpers/StarRating/StarRating';

const cx = classNames.bind(styles);

function ProductCard({ categoryName }) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    // console.log(categoryName);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
    }, [dispatch]);

    const filterProductByCategory = products.filter((prd) => prd.categoryName === categoryName);
    // console.log(filterProductByCategory);

    // Sử dụng map để render mỗi sản phẩm ra giao diện
    const renderedProducts = filterProductByCategory.map((product) => (
        <div key={product.id} className={cx('col')}>
            <article className={cx('wrap')}>
                <div className={cx('img-wrap')}>
                    <Button to={`/detail/${product.name}`}>
                        <img className={cx('thumb')} src={product.imageName} alt={product.name} />
                    </Button>
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('name', 'line-clamp')}>
                        <Button to={`/detail/${product.name}`}>{product.name}</Button>
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
