import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import StarRating from '~/utils/helpers/StarRating/StarRating';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListProductApi } from '~/actions/ProductAction';
import { actionAddToCart } from '~/actions/CartAction';

const cx = classNames.bind(styles);

function Detail() {
    const [isLoading, setIsLoading] = useState(true);
    const { name } = useParams();
    // console.log(name);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    // console.log(products);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            setIsLoading(false);
        }
    }, [products]);

    const findProductByParam = products.find((prd) => prd.name === name);
    // console.log(findProductByParam);

    const handleAddToCart = () => {
        dispatch(actionAddToCart(findProductByParam));
    };

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={cx('container')}>
                    <div className={cx('row', 'top')}>
                        <h3>{findProductByParam.name}</h3>
                        <StarRating />
                    </div>

                    <hr />

                    <div className={cx('row')}>
                        <div className={cx('col-5', 'image-wrap')}>
                            <img src={findProductByParam.imageName} alt="" />
                        </div>
                        <div className={cx('offset-1', 'col-5', 'info')}>
                            <div className={cx('feature')}>
                                <ul>
                                    <li>{findProductByParam.detail}</li>
                                    <li>{findProductByParam.info}</li>
                                    <li>{findProductByParam.manufacturerName}</li>
                                    <li>{findProductByParam.categoryName}</li>
                                    <li>{findProductByParam.price}</li>
                                </ul>
                            </div>

                            <div className={cx('row', 'action')}>
                                <div className={cx('col-8')}>
                                    <Button to={'/cart'} primary className={cx('buy')}>
                                        MUA NGAY
                                        <p>(Giao nhanh từ 2 giờ hoặc nhận tại của hàng)</p>
                                    </Button>
                                </div>
                                <div className={cx('col-4')}>
                                    <Button
                                        rounded
                                        className={cx('add-to-cart')}
                                        leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Detail;
