import React from 'react';
import classNames from 'classnames/bind';
import styles from './Error.module.scss';
import images from '~/assets/images';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);
function Error() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('thumb-wrap')}>
                <img src={images.chibi} alt="" />
            </div>
            <span className={cx('title')}>Địa chỉ không tồn tại</span>
            <Button primary to={'/'}>
                Quay lại
            </Button>
        </div>
    );
}

export default Error;
