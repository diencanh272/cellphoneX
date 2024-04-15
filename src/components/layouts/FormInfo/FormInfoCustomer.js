import classNames from 'classnames/bind';

import styles from './FormInfoCustomer.module.scss';

const cx = classNames.bind(styles);

function FormInfoCustomer() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('top')}>
                <div className={cx('full-name')}>
                    <input className={cx('input')} type="text" placeholder="Họ và tên(bắt buộc)" />
                    <label className={cx('title')}>Họ và tên</label>
                </div>
                <div className={cx('phone-number')}>
                    <input className={cx('input')} type="text" placeholder="Số điện thoại(bắt buộc)" />
                    <label className={cx('title')}>Số điện thoại</label>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div className={cx('email')}>
                    <input className={cx('input')} type="text" placeholder="Email" />
                    <label className={cx('title')}>Email</label>
                </div>
            </div>
            <span>(*) Hóa đơn VAT được gửi qua Email này!</span>
        </div>
    );
}

export default FormInfoCustomer;
