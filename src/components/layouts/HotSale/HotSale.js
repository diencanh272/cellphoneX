import classNames from 'classnames/bind';

import styles from './HotSale.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../ProductCard';

const cx = classNames.bind(styles);

function HotSale() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('row', 'top')}>
                <div className={cx('col-6', 'title')}>
                    <FontAwesomeIcon icon={faFire} />
                    <span>
                        HOTSALE <span className={cx('flash')}>GIÁ SỐC</span>
                    </span>
                </div>
                <div className={cx('col-3', 'offset-3', 'countdown')}> Kết thúc sau : </div>
            </div>
            <div className={cx('row', 'row-cols-5', 'content')}>
                <ProductCard />
            </div>
        </div>
    );
}

export default HotSale;
