import classNames from 'classnames/bind';

import styles from './ProductList.module.scss';
// import Button from '~/components/common/Button';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';

const cx = classNames.bind(styles);

function ProductList() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
    }, [dispatch]);

    const renderProductByCategory = categories.map((category, index) => {
        return (
            <div className={cx('wrap')} key={index}>
                <div className={cx('row', 'top')}>
                    <h2 className={cx('title')}>{category.name}</h2>
                    {/* <div className={cx('filter')}>
                        <Button>Filter manufacturer </Button>
                    </div> */}
                </div>
                <div className={cx('row', 'row-cols-5')}>
                    <ProductCard />
                </div>
            </div>
        );
    });

    return <>{renderProductByCategory}</>;
}

export default ProductList;
