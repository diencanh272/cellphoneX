import classNames from 'classnames/bind';

import styles from './ProductList.module.scss';
// import Button from '~/components/common/Button';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import { Link } from 'react-router-dom';
import { actionFetchListProductApi } from '~/actions/ProductAction';

const cx = classNames.bind(styles);

function ProductList() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
        dispatch(actionFetchListProductApi());
    }, [dispatch]);

    const renderProductByCategory = categories.map((category, index) => {
        return (
            <div className={cx('wrap')} key={index}>
                <div className={cx('row', 'top')}>
                    <Link to={`/category/${category.name}`}>
                        <h2 className={cx('title')}>{category.name}</h2>
                    </Link>
                </div>
                <div className={cx('row', 'row-cols-5')}>
                    <ProductCard categoryName={category.name} products={products} />
                </div>
            </div>
        );
    });

    return <>{renderProductByCategory}</>;
}

export default ProductList;
