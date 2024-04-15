import classNames from 'classnames/bind';

import styles from './PopupLogin.module.scss';
import images from '~/assets/images';
import Button from '../../Button';

const cx = classNames.bind(styles);

function PopupLogin(modalOpen) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('top')}>
                <h2>Cellphones</h2>
            </div>
            <div className={cx('thumbs')}>
                <img src={images.chibi} alt="Cellphones" />
            </div>
            <div className={cx('text')}>
                <p>Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ dàng hơn.</p>
            </div>
            <div className={cx('bottom')}>
                <Button
                    className={cx('btn')}
                    rounded
                    to={'/account/signup'}
                    onClick={() => (modalOpen.modalOpen = false)}
                >
                    Đăng kí
                </Button>

                <Button
                    className={cx('btn')}
                    primary
                    to={'/account/login'}
                    onClick={() => (modalOpen.modalOpen = false)}
                >
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default PopupLogin;
