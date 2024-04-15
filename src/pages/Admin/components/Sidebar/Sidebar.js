import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Button from '~/components/common/Button';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHome, faIndustry, faList, faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    const location = useLocation();

    // Hàm kiểm tra xem một URL có phù hợp với đường dẫn cho trước không
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('top')}>
                <Button to={'/admin'} leftIcon={<img src={images.chibi} alt="" />}>
                    Admin
                </Button>
            </div>

            <div className={cx('main')}>
                <ul className={cx('list-group')}>
                    <li className={cx('item')}>
                        <Button className={cx('btn')} to={'/'} text large leftIcon={<FontAwesomeIcon icon={faHome} />}>
                            Home
                        </Button>
                    </li>
                    <li className={cx('item', { active: isActive('/admin/dashboard') })}>
                        <Button
                            className={cx('btn')}
                            to={'dashboard'}
                            text
                            large
                            leftIcon={<FontAwesomeIcon icon={faChartLine} />}
                        >
                            Dashboard
                        </Button>
                    </li>
                    <li className={cx('item', { active: isActive('/admin/accounts') })}>
                        <Button
                            className={cx('btn')}
                            to={'accounts'}
                            text
                            large
                            leftIcon={<FontAwesomeIcon icon={faPeopleGroup} />}
                        >
                            Accounts
                        </Button>
                    </li>
                    <li className={cx('item', { active: isActive('/admin/manufacturer') })}>
                        <Button
                            className={cx('btn')}
                            to={'manufacturer'}
                            text
                            large
                            leftIcon={<FontAwesomeIcon icon={faIndustry} />}
                        >
                            Manufacturer
                        </Button>
                    </li>
                    <li className={cx('item', { active: isActive('/admin/category') })}>
                        <Button
                            className={cx('btn')}
                            to={'category'}
                            text
                            large
                            leftIcon={<FontAwesomeIcon icon={faList} />}
                        >
                            Category
                        </Button>
                    </li>
                    <li className={cx('item', { active: isActive('/admin/product') })}>
                        <Button
                            className={cx('btn')}
                            to={'product'}
                            text
                            large
                            leftIcon={<FontAwesomeIcon icon={faProductHunt} />}
                        >
                            Product
                        </Button>
                    </li>
                    <li className={cx('item', { active: isActive('/admin/create') })}>
                        <Button
                            className={cx('btn')}
                            to={'create'}
                            text
                            large
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        >
                            Create
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
