import classNames from 'classnames/bind';

import styles from './NavbarCreate.module.scss';
import Button from '~/components/common/Button';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function NavbarCreate() {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={cx('wrap')}>
            <Button rounded to={'product'} className={cx({ active: isActive('/admin/create/product') })}>
                Create New Product
            </Button>
            <Button rounded to={'account'} className={cx({ active: isActive('/admin/create/account') })}>
                Create New Account
            </Button>
            <Button rounded to={'category'} className={cx({ active: isActive('/admin/create/category') })}>
                Create New Category
            </Button>
            <Button rounded to={'manufacturer'} className={cx({ active: isActive('/admin/create/manufacturer') })}>
                Create New Manufacturer
            </Button>
        </div>
    );
}

export default NavbarCreate;
