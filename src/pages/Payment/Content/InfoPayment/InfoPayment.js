import classNames from 'classnames/bind';

import styles from './InfoPayment.module.scss';

import Button from '~/components/common/Button';
import CartItem from '~/components/layouts/CartItem';
import FormAddress from '~/components/layouts/FormAddress';
import FormInfoCustomer from '~/components/layouts/FormInfoCustomer';
import AllPayment from '~/utils/helpers/AllPayment';
import FormAddressContext, { FormAddressProvider } from '~/utils/contexts/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function InfoPayment() {
    const { formData } = useContext(FormAddressContext);
    // console.log(formData);

    const navigate = useNavigate();

    let dataCart = [];
    if (localStorage && localStorage.getItem('ProductCart')) {
        dataCart = JSON.parse(localStorage.getItem('ProductCart'));
    }
    // console.log(dataCart);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('FormAddress', JSON.stringify(formData));
        setTimeout(() => {
            navigate('/cart/accurate-payment');
        }, 1000);
    };

    return (
        <>
            {dataCart.qtt === 0 ? (
                <span>Không có sản phẩm nào trong giỏ hàng</span>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className={cx('listBuy')}>
                        <CartItem />
                    </div>
                    <div className={cx('customer')}>
                        <p>Thông tin khách hàng</p>
                        <FormInfoCustomer />
                    </div>
                    <div className={cx('delivery')}>
                        <p>Thông tin nhận hàng</p>
                        <FormAddress />
                    </div>
                    <div className={cx('total')}>
                        <div className={cx('total-price')}>
                            <p>Tổng tiền: </p>
                            <span>
                                <AllPayment />
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
