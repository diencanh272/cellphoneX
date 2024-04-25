import classNames from 'classnames/bind';

import styles from './FormCreate.module.scss';
import NavbarCreate from './NavbarCreate';
import ContentCreate from './ContentCreate';

const cx = classNames.bind(styles);

function FormCreate() {
    return (
        <div>
            <div className={cx('navbar')}>
                <NavbarCreate />
            </div>
            <div className={cx('content')}>
                <ContentCreate />
            </div>
        </div>
    );
}

export default FormCreate;
