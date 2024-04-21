import classNames from 'classnames/bind';

import styles from './PopupAddToCart.module.scss';
import Button from '../../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PopupAddToCart() {
    return (
        <div className={cx('success')}>
            <Button leftIcon={<FontAwesomeIcon icon={faCheck} />}>Thêm mới sản phẩm thành công</Button>
        </div>
    );
}

export default PopupAddToCart;
