import classNames from 'classnames/bind';

import styles from './Account.module.scss';
import images from '~/assets/images';
import Button from '~/components/common/Button';
import icons from '~/assets/icon';
import FormLogin from '~/components/layouts/FormLogin';
import FormSignup from '~/components/layouts/FormSignup';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Account() {
    const location = useLocation();
    const setForm = (path) => {
        return location.pathname === path;
    };

    const FormLoginOrSignup = () =>
        setForm('/account/login') ? (
            <FormLogin />
        ) : setForm('/account/signup') ? (
            <FormSignup />
        ) : setForm('/account') ? (
            <AccountProfile />
        ) : (
            <strong>Page Not Found</strong>
        );

    const AccountProfile = () => {
        if (localStorage && localStorage.getItem('Account')) {
            let accountProfile = JSON.parse(localStorage.getItem('Account'));

            return <div>{accountProfile.username}</div>;
        } else {
            return <FormLogin />;
        }
    };

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

                    <div className={cx('top')}>
                        <div className={cx('thumb')}>
                            <img src={images.chibi} alt="" />
                        </div>
                        <div className={cx('title')}>
                            <h2>Đăng nhập tài khoản Cellphones</h2>
                        </div>
                    </div>
                    <div className={cx('choose-login')}>
                        <div className={cx('login-btn')}>
                            <Button leftIcon={<img src={icons.google} alt="" />}>Google</Button>
                        </div>
                        <div className={cx('login-btn')}>
                            <Button leftIcon={<img src={icons.zalo} alt="" />}>Zalo</Button>
                        </div>
                    </div>
                    <div className={cx('line-through')}>
                        <hr />
                        <p>hoặc</p>
                        <hr />
                    </div>
                    <div className={cx('form-wrap')}>
                        <FormLoginOrSignup />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
