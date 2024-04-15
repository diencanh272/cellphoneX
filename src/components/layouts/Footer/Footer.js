import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrap')}>
            <img src={images.footer} alt="" />
        </div>
    );
}

export default Footer;
