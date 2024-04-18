import React from 'react';
import classNames from 'classnames/bind';

import styles from './withLoading.module.scss';

const cx = classNames.bind(styles);

function withLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return (
                <div className={cx('wrap')}>
                    <div className={cx('loader')}></div>;
                </div>
            );
        }
        return <Component {...props} />;
    };
}

export default withLoading;
