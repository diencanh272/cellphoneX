import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import ShowStarRating from '~/utils/helpers/ShowStarRating/ShowStarRating';
// import StarRating from '~/utils/helpers/StarRating/StarRating';

const cx = classNames.bind(styles);

function ProductCard({ categoryName, productSorted, products }) {
    // console.log(products);
    let filterProductByCategory = [];

    if (productSorted) {
        filterProductByCategory = productSorted.filter((prd) => prd.categoryName === categoryName);
    } else if (products) {
        filterProductByCategory = products.filter((prd) => prd.categoryName === categoryName && prd.ratingStar >= 4);
    }
    // console.log(filterProductByCategory);

    // Sử dụng map để render mỗi sản phẩm ra giao diện
    const renderedProducts = filterProductByCategory.map((product) => {
        const nameParam = product.name.toLowerCase();
        return (
            <div key={product.id} className={cx('col')}>
                <article className={cx('wrap')}>
                    <div className={cx('img-wrap')}>
                        <Button to={`/detail/${nameParam}`}>
                            <img className={cx('thumb')} src={product.imageName} alt={product.name} />
                        </Button>
                    </div>
                    <div className={cx('info')}>
                        <h3 className={cx('name', 'line-clamp')}>
                            <Button to={`/detail/${nameParam}`}>{product.name}</Button>
                        </h3>
                        <div className={cx('price')}>
                            <span className={cx('current')}>{`${product.price}₫`}</span>
                            <span className={cx('old')}>{`${product.price}₫`}</span>
                        </div>
                        <div className={cx('rating')}>
                            <ShowStarRating starRating={product.ratingStar} />
                            <Button className={cx('like')} rightIcon={<FontAwesomeIcon icon={faHeart} />}>
                                Yêu thích
                            </Button>
                        </div>
                    </div>
                </article>
            </div>
        );
    });

    return <>{renderedProducts}</>;
}

export default ProductCard;
