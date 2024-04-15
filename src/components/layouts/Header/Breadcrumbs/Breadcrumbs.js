import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Breadcrumbs.module.scss';

import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function Breadcrumbs() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
                <Button className={cx('item')} leftIcon={<FontAwesomeIcon icon={faHome} />}>
                    Trang chủ
                </Button>
            </div>
        </div>
    );
}

export default Breadcrumbs;
