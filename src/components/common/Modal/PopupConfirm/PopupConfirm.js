import classNames from 'classnames/bind';
import styles from './PopupConfirm.module.scss';

import Button from '../../Button';

const cx = classNames.bind(styles);

function PopupConfirm({ productName, btnYes, btnNo }) {
    return (
        <div className={cx('wrap')}>
            <span>
                Bạn có muốn xóa sản phẩm <p>{productName}</p> không?
            </span>
            <div className={cx('confirm')}>
                <Button className={cx('btn')} rounded onClick={btnYes}>
                    Yes
                </Button>
                <Button className={cx('btn')} rounded onClick={btnNo}>
                    No
                </Button>
            </div>
        </div>
    );
}

export default PopupConfirm;
