import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './HeaderMain.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/layouts/Search';
import Button from '~/components/common/Button';
import { Modal } from 'antd';
import UserLogin from '../../UserLogin';
import PopupLogin from '~/components/common/Modal/Popup/PopupLogin';
import QttProductsCart from '~/utils/helpers/QttProductsCart';

const cx = classNames.bind(styles);

function HeaderMain() {
    const [modalOpen, setModalOpen] = useState(false);
    const [account, setAccount] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname === '/account';

    // console.log(userCurrentSignup);

    useEffect(() => {
        if (localStorage.getItem('Account')) {
            setAccount(true);
        }
    }, []);
    const handleClickCart = () => {
        if (localStorage && localStorage.getItem('Account')) {
            navigate('/cart');
        } else {
            setModalOpen(true);
        }
    };

    const UserLoginButton = () =>
        account ? (
            <UserLogin />
        ) : (
            <Button
                className={cx('user')}
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                onClick={() => setModalOpen(!path)}
            >
                User
            </Button>
        );

    return (
        <nav className={cx('wrap')}>
            <div className="container">
                <div className={cx('row', 'main')}>
                    <div className={cx('logo', 'col-3')}>
                        <Link to={'/'}>
                            <img src={images.logo} alt="CellPhones" />
                        </Link>
                    </div>
                    <div className={cx('search', 'col-5')}>
                        <Search />
                    </div>

                    <div className={cx('info', 'col-4')}>
                        <Button
                            className={cx('cart')}
                            leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
                            rightIcon={<QttProductsCart />}
                            onClick={handleClickCart}
                        >
                            Giỏ hàng
                        </Button>
                        <UserLoginButton />
                    </div>
                </div>
            </div>
            <Modal centered open={modalOpen} footer={null} onCancel={() => setModalOpen(false)} width={350}>
                <PopupLogin modalOpen={modalOpen} />
            </Modal>
        </nav>
    );
}

export default HeaderMain;
