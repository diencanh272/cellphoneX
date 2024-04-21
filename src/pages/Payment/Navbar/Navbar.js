import classNames from 'classnames/bind';

import styles from './Navbar.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar() {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <div className={cx('top')}>
                <Button to={'/cart'} leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}></Button>
                <p className={cx('title')}>Thông tin</p>
            </div>
            <div className={cx('nav')}>
                <div className={cx('nav-item', { active: isActive('/cart/info-payment') })}>
                    <Button to={'info-payment'}>1. THÔNG TIN</Button>
                </div>
                <div className={cx('nav-item', { active: isActive('/cart/accurate-payment') })}>
                    <Button to={'accurate-payment'}>2. THANH TOÁN</Button>
                </div>
            </div>
        </>
    );
}

export default Navbar;
