import classNames from 'classnames/bind';

import styles from './Account.module.scss';
import images from '~/assets/images';
import Button from '~/components/common/Button';
import FormLogin from '~/components/layouts/FormLogin';
import FormSignup from '~/components/layouts/FormSignup';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function Account() {
    const location = useLocation();
    const setForm = (path) => {
        return location.pathname === path;
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);
    const accounts = useSelector((state) => state.accounts);
    let accountProfile = {};

    const FormLoginOrSignup = () =>
        setForm('/account/login') ? <FormLogin /> : setForm('/account/signup') ? <FormSignup /> : '';

    const AccountProfile = () => {
        if (localStorage && localStorage.getItem('AccountId')) {
            let accountProfileId = JSON.parse(localStorage.getItem('AccountId'));
            accountProfile = accounts.find((acc) => acc.id === accountProfileId);
            return (
                <div>
                    <h2>Chào mừng {`${accountProfile.username}`} đến với Cellphones</h2>
                    {accountProfile.username}
                </div>
            );
        }
    };

    //! Render title login signup start
    const TitleLoginOrSignup = () =>
        setForm('/account/login') ? (
            <h2>Đăng nhập tài khoản Cellphones</h2>
        ) : setForm('/account/signup') ? (
            <h2>Đăng kí tài khoản Cellphones</h2>
        ) : (
            ''
        );

    //! Render title login signup end

    //! TopLogin SignUp start
    const TopLoginSignup = () => (
        <>
            <div className={cx('top')}>
                <div className={cx('thumb')}>
                    <img src={images.chibi} alt="" />
                </div>
                <div className={cx('title')}>
                    <TitleLoginOrSignup />
                </div>
            </div>
        </>
    );
    //! TopLogin SignUp end

    const ButtonNav = () =>
        setForm('/account/signup') ? (
            <Button to={'/account/login'} leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}></Button>
        ) : (
            ''
        );

    return (
        <div className={cx('wrap')}>
            <div className={cx('row')}>
                <div className={cx('offset-3', 'col-6')}>
                    <div className={cx('nav')}>
                        <ButtonNav />
                    </div>
                    <TopLoginSignup />

                    <div className={cx('form-wrap')}>
                        <FormLoginOrSignup />
                        {setForm('/account') && <AccountProfile />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
