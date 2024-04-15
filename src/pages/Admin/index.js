import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
const cx = classNames.bind(styles);

function Admin() {
    return (
        <div className={cx('main')}>
            <div className={cx('row')} style={{ height: '100vh' }}>
                <div className={cx('sidebar', 'col-2')}>
                    <Sidebar />
                </div>
                <div className={cx('content', 'col-9')}>
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default Admin;
