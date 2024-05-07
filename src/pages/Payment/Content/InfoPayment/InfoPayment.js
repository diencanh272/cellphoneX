import classNames from 'classnames/bind';

import styles from './InfoPayment.module.scss';

import Button from '~/components/common/Button';
import CartItem from '~/components/layouts/CartItem';
import FormAddress from '~/components/layouts/FormAddress';
import FormInfoCustomer from '~/components/layouts/FormInfoCustomer';
import AllPayment from '~/utils/helpers/AllPayment';
import FormAddressContext, { FormAddressProvider } from '~/utils/contexts/context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function InfoPayment() {
    const { formData } = useContext(FormAddressContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accounts = useSelector((state) => state.accounts);
    const products = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);
    let accountLoginId;
    if (localStorage && localStorage.getItem('AccountId')) {
        accountLoginId = JSON.parse(localStorage.getItem('AccountId'));
    }

    let getAccountLogin = accounts.find((acc) => acc.id === accountLoginId);
    let getCartAccountLogin;
    if (getAccountLogin && getAccountLogin.carts) {
        getCartAccountLogin = getAccountLogin.carts;
    }

    let productBuy = [];

    getCartAccountLogin &&
        getCartAccountLogin.map((cartItem, index) => {
            const product = products.find((product) => product.id === cartItem.cartItemId);
            const priceQtt = { price: product.price, quantity: cartItem.quantity };
            return productBuy.push(priceQtt);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('FormAddress', JSON.stringify(formData));
        setTimeout(() => {
            navigate('/cart/accurate-payment');
        }, 1000);
    };

    return (
        <>
            {productBuy.length === 0 ? (
                <span>Không có sản phẩm nào trong giỏ hàng</span>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className={cx('listBuy')}>
                        <CartItem />
                    </div>
                    <div className={cx('customer')}>
                        <p>Thông tin khách hàng</p>
                        <FormInfoCustomer account={getAccountLogin} />
                    </div>
                    <div className={cx('delivery')}>
                        <p>Thông tin nhận hàng</p>
                        <FormAddress />
                    </div>
                    <div className={cx('total')}>
                        <div className={cx('total-price')}>
                            <p>Tổng tiền: </p>
                            <span>
                                <AllPayment cart={productBuy} />
                            </span>
                        </div>
                        <div className={cx('action')}>
                            <Button className={cx('action-buy')} primary type="submit">
                                Tiếp tục
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}

const GetDataFormAddress = () => (
    <FormAddressProvider>
        <InfoPayment />
    </FormAddressProvider>
);

export default GetDataFormAddress;
