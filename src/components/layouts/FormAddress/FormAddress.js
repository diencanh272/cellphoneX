import classNames from 'classnames/bind';

import styles from './FormAddress.module.scss';

const cx = classNames.bind(styles);

function FormAddress() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('box-input-wrap')}>
                <div className={cx('box-input')}>
                    <input className={cx('input')} type="text" placeholder="Chọn Tỉnh / Thành phố" />
                    <label className={cx('title')}>Tỉnh / Thành phố</label>
                </div>
                <div className={cx('box-input')}>
                    <input className={cx('input')} type="text" placeholder="Chọn Quận / Huyện" />
                    <label className={cx('title')}>Quận / Huyện</label>
                </div>
            </div>
            <div className={cx('box-input-wrap')}>
                <div className={cx('box-input')}>
                    <input className={cx('input')} type="text" placeholder="Chọn Phường / Xã" />
                    <label className={cx('title')}>Phường / Xã</label>
                </div>
                <div className={cx('box-input')}>
                    <input className={cx('input')} type="text" placeholder="Số nhà , tên đường" />
                    <label className={cx('title')}>Địa chỉ</label>
                </div>
            </div>
            <div className={cx('box-input-wrap')}>
                <div className={cx('box-input')}>
                    <input className={cx('input')} type="text" placeholder="Ghi chú khác (nếu có)" />
                    <label className={cx('title')}>Ghi chú</label>
                </div>
            </div>
        </div>
    );
}

export default FormAddress;
