// import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Payment.module.scss';
import Navbar from './Navbar';
import ContentWithLoading from './Content';
import { useEffect, useState } from 'react';
// import CartItem from '~/components/layouts/CartItem';
// import FormInfoCustomer from '~/components/layouts/FormInfo/FormInfoCustomer';
// import FormAddress from '~/components/layouts/FormAddress';

const cx = classNames.bind(styles);

function Payment() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className={cx('row')}>
                <div className={cx('offset-3', 'col-6')}>
                    <Navbar />
                    <ContentWithLoading isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}

export default Payment;
