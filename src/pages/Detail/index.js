import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListProductApi } from '~/actions/ProductAction';
import { Modal } from 'antd';
import ShowStarRating from '~/utils/helpers/ShowStarRating/ShowStarRating';
import PopupLogin from '~/components/common/Modal/Popup/PopupLogin';
import withLoading from '~/utils/helpers/withLoading';
import { actionAddToCartDispatch, actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function Detail() {
    const [isLoading, setIsLoading] = useState(true);
    const { name } = useParams();
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const navigate = useNavigate();
    // console.log(name);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    // console.log(carts);
    // console.log(products);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const findProductByParam = products.find((prd) => prd.name.toLowerCase() === name);
    // console.log(findProductByParam);
    // console.log(checkProductExistCart);
    // accountId, itemId, quantity
    const accountId = JSON.parse(localStorage.getItem('AccountId'));
    // const cartAccount = account.cart;
    // console.log(cartAccount); //[]

    //!Popup Add To Cart Success Start
    const success = (accountId, cartItem) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn thêm <strong style={{ textTransform: 'capitalize' }}>{name}</strong> vào giỏ hàng không?
                </span>
            ),
            onOk() {
                setTimeout(() => {
                    dispatch(actionAddToCartDispatch(accountId, cartItem));
                }, 500);
            },
            onCancel() {},
        });
    };

    const handleAddToCart = () => {
        if (localStorage && localStorage.getItem('AccountId')) {
            const cartItemId = findProductByParam.id;
            const quantity = 1;
            success(accountId, { cartItemId, quantity });
        } else {
            setOpenModalLogin(true);
        }
    };

    //!Popup Add To Cart Success End

    //!Kiểm tra login với mua ngay start
    const successBuyNow = (accountId, cartItem) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn thêm <strong style={{ textTransform: 'capitalize' }}>{name}</strong> vào giỏ hàng không?
                </span>
            ),
            onOk() {
                setTimeout(() => {
                    dispatch(actionAddToCartDispatch(accountId, cartItem));
                    navigate('/cart/info-payment');
                }, 500);
            },
            onCancel() {},
        });
    };
    const handleBuyNow = () => {
        if (localStorage && localStorage.getItem('AccountId')) {
            const cartItemId = findProductByParam.id;
            const quantity = 1;
            successBuyNow(accountId, { cartItemId, quantity });
        } else {
            setOpenModalLogin(true);
        }
    };
    //!Kiểm tra login với mua ngay End

    const MainDetail = () => {
        return (
            <div className={cx('container')}>
                <div className={cx('row', 'top')}>
                    <h3>{findProductByParam.name}</h3>
                    <ShowStarRating starRating={findProductByParam.ratingStar} />
                </div>

                <hr />

                <div className={cx('row')}>
                    <div className={cx('col-5', 'image-wrap')}>
                        <img src={findProductByParam.imageName} alt="" />
                    </div>
                    <div className={cx('offset-1', 'col-5', 'info')}>
                        <div className={cx('feature')}>
                            <ul>
                                <li>Detail:{findProductByParam.detail}</li>
                                <li>Information: {findProductByParam.info}</li>
                                <li>Nhà sản xuất: {findProductByParam.manufacturerName}</li>
                                <li>{findProductByParam.categoryName}</li>
                                <li>Giá: {`${findProductByParam.price}₫`}</li>
                            </ul>
                        </div>

                        <div className={cx('row', 'action')}>
                            <div className={cx('col-8')}>
                                <Button primary className={cx('buy')} onClick={handleBuyNow}>
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
        );
    };

    const MainDetailWithLoading = withLoading(MainDetail);

    return (
        <>
            <MainDetailWithLoading isLoading={isLoading} />
            <Modal centered open={openModalLogin} footer={null} onCancel={() => setOpenModalLogin(false)} width={350}>
                <PopupLogin modalOpen={openModalLogin} />
            </Modal>
        </>
    );
}

export default Detail;
