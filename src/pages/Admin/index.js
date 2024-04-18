import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import Sidebar from './components/Sidebar';
import ContentWithLoading from './components/Content/Content';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Admin() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div className={cx('main')}>
            <div className={cx('row')} style={{ height: '100vh' }}>
                <div className={cx('sidebar', 'col-2')}>
                    <Sidebar />
                </div>
                <div className={cx('content', 'col-9')}>
                    <ContentWithLoading isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}

export default Admin;
