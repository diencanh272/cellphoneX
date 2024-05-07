import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import Button from '~/components/common/Button';
import ProductCard from '~/components/layouts/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowDownWideShort, faList, faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListProductApi } from '~/actions/ProductAction';
import { actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';

const cx = classNames.bind(styles);

function Category() {
    const dispatch = useDispatch();
    const param = useParams();
    // console.log(param);
    const products = useSelector((state) => state.products);
    const manufacturers = useSelector((state) => state.manufacturers);

    const findProductByParam = products.filter((prd) => prd.categoryName === param.slug);
    const getManufacturer = findProductByParam.map((prd) => prd.manufacturerName);
    const filteredManu = manufacturers.filter((manufacturer) => getManufacturer.includes(manufacturer.name));
    // console.log(findProductByParam);

    const [sortedProducts, setSortedProducts] = useState(findProductByParam);
    const [showProducts, setShowProducts] = useState(10);
    const [allProductByParam] = useState(findProductByParam);
    const [showButtonGetMore, setShowButtonGetMore] = useState(true);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);

    const convertPriceToNumber = (priceString) => {
        const cleanedPrice = priceString.replace(/[.đ]/g, '');
        return parseInt(cleanedPrice, 10);
    };

    const sortByPriceAsc = () => {
        const sorted = [...sortedProducts].sort(
            (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price),
        );
        setSortedProducts(sorted);
    };

    const sortByPriceDesc = () => {
        const sorted = [...sortedProducts].sort(
            (a, b) => convertPriceToNumber(b.price) - convertPriceToNumber(a.price),
        );
        setSortedProducts(sorted);
    };

    const sortByRating = () => {
        const sorted = [...sortedProducts].sort((a, b) => b.ratingStar - a.ratingStar);
        setSortedProducts(sorted);
    };

    const filterByManufacturer = (manuName) => {
        const isManufacturerExists = allProductByParam.some((prd) => prd.manufacturerName === manuName);
        if (isManufacturerExists) {
            const filtered = allProductByParam.filter((prd) => prd.manufacturerName === manuName);
            // console.log(filtered);
            setSortedProducts(filtered);
        } else {
            console.log(`Không có sản phẩm từ nhà sản xuất ${manuName}.`);
        }
    };

    const renderLogo = filteredManu.map((manu, index) => (
        <div key={index} className={cx('logo-item')}>
            <Button onClick={() => filterByManufacturer(manu.name)}>
                <img className={cx('logo-thumb')} src={manu.logo} alt={manu.name} />
            </Button>
        </div>
    ));

    const handleGetMore = () => {
        const newShowProducts = showProducts + 10;
        if (newShowProducts >= allProductByParam.length) {
            setShowProducts(allProductByParam.length);
            setShowButtonGetMore(false);
        } else {
            setShowProducts(newShowProducts);
        }
    };

    const currentProducts = sortedProducts.length > 0 ? sortedProducts.slice(0, showProducts) : [];

    return (
        <div className={cx('container', 'wrap')}>
            <div className={cx('row')}>
                <h3 className={cx('category-name')}>{param.slug}</h3>
            </div>
            <div className={cx('row', 'row-cols-6', 'manufacturer')}>{renderLogo}</div>
            <div className={cx('filter-wrap')}>
                <p className={cx('filter-title')}>Sắp xếp theo</p>
                <div className={cx('filter-action')}>
                    <Button
                        rounded
                        leftIcon={<FontAwesomeIcon icon={faList} />}
                        onClick={() => {
                            setShowProducts(10);
                            setShowButtonGetMore(true);
                            setSortedProducts(allProductByParam.slice(0, 10));
                        }}
                    >
                        Tất cả
                    </Button>
                    <Button
                        rounded
                        leftIcon={<FontAwesomeIcon icon={faArrowDownWideShort} />}
                        onClick={sortByPriceDesc}
                    >
                        Giá cao - thấp
                    </Button>
                    <Button rounded leftIcon={<FontAwesomeIcon icon={faArrowDownShortWide} />} onClick={sortByPriceAsc}>
                        Giá thấp - cao
                    </Button>
                    <Button rounded leftIcon={<FontAwesomeIcon icon={faStar} />} onClick={sortByRating}>
                        Đánh giá cao
                    </Button>
                </div>
            </div>
            <div className={cx('list-product')}>
                <div className={cx('row', 'row-cols-5')}>
                    <ProductCard categoryName={param.slug} productSorted={currentProducts} />
                </div>
                <div className={cx('get-more')}>
                    {showButtonGetMore ? (
                        <Button rounded onClick={handleGetMore}>
                            Lấy thêm sản phẩm
                        </Button>
                    ) : (
                        <span>Đã hiển thị hết sản phẩm</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Category;
