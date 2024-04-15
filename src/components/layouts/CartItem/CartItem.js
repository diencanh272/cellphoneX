import classNames from 'classnames/bind';

import styles from './CartItem.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CartItem() {
    return (
        <div className={cx('item')}>
            <div className={cx('checkbox-product')}>
                <input type="checkbox" id="item1" />
                <label htmlFor="item1">
                    <img className={cx('thumbs')} src={images.product} alt="" />
                </label>
            </div>
            <div className={cx('info-wrap')}>
                <div className={cx('info-product')}>
                    <Link className={cx('name-product', 'line-clamp')}>
                        <h3>
                            {' '}
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque velit nulla delectus
                            pariatur suscipit? Rerum, quas magnam molestias, placeat expedita voluptate error officia
                            distinctio aliquid tenetur voluptatum cum hic nulla.
                        </h3>
                    </Link>
                    <Button rightIcon={<FontAwesomeIcon icon={faTrash} />}></Button>
                </div>
                <div className={cx('price-product')}>
                    <div className={cx('price-block')}>
                        <span className={cx('price-current')}>100$</span>
                        <span className={cx('price-old')}>150$</span>
                    </div>
                    <div className={cx('price-action')}>
                        <Button className={cx('minus')}>-</Button>
                        <input type="text" readOnly value={2} />
                        <Button className={cx('plus')}>+</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
