import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './BannerRight.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function BannerRight() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('item')}>
                <Link to={'#'}>
                    <img src={images.bannerRight1} alt="" />
                </Link>
            </div>
            <div className={cx('item')}>
                <Link to={'#'}>
                    <img src={images.bannerRight2} alt="" />
                </Link>
            </div>
            {/* <div className={cx('item')}>
                <Link to={'#'}>
                    <img src={images.bannerRight3} alt="" />
                </Link>
            </div> */}
        </div>
    );
}

export default BannerRight;
