import classNames from 'classnames/bind';

import styles from './FormInfoCustomer.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FormInfoCustomer() {
    let dataAccount = {};
    if (localStorage && localStorage.getItem('Account')) {
        dataAccount = JSON.parse(localStorage.getItem('Account'));
    }
    const [fullName, setFullName] = useState(dataAccount.fullname);
    const [phone, setPhone] = useState(dataAccount.mobile);
    const [email, setEmail] = useState(dataAccount.fullname);

    // console.log(dataAccount);

    return (
        <div className={cx('wrap')}>
            <div className={cx('top')}>
                <div className={cx('full-name')}>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="Họ và tên(bắt buộc)"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <label className={cx('title')}>Họ và tên(*)</label>
                </div>
                <div className={cx('phone-number')}>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="Số điện thoại(bắt buộc)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className={cx('title')}>Số điện thoại(*)</label>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div className={cx('email')}>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className={cx('title')}>Email</label>
                </div>
            </div>
            <span>(*) Hóa đơn VAT được gửi qua Email này!</span>
        </div>
    );
}

export default FormInfoCustomer;
