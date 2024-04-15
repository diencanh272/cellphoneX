import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './TopBanner.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function TopBanner() {
    return (
        <>
            <div className={cx('wrap', 'row')}>
                <div className="col-4">
                    <Link href="#">
                        <img className={cx('img')} src={images.banner1} alt="" />
                    </Link>
                </div>
                <div className="col-4">
                    <Link href="#">
                        <img className={cx('img')} src={images.banner2} alt="" />
                    </Link>
                </div>
                <div className="col-4">
                    <Link href="#">
                        <img className={cx('img')} src={images.banner3} alt="" />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default TopBanner;
