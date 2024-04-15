import React from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';

import MainMenu from '~/components/layouts/MainMenu';
import CarouselApp from '~/components/common/CarouselApp';
import BannerRight from '~/components/layouts/BannerRight';
import HotSale from '~/components/layouts/HotSale';
import ProductList from '~/components/layouts/ProductList';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
                {/**Home Top */}
                <div className={cx('row', 'top')}>
                    <div className={cx('col-3')}>
                        <MainMenu />
                    </div>
                    <div className={cx('col-6')}>
                        <CarouselApp />
                    </div>
                    <div className={cx('col-3')}>
                        <BannerRight />
                    </div>
                </div>

                {/**Home Hot Sale */}
                <div className={cx('hot-sale')}>
                    <HotSale />
                </div>

                {/**Home featured-product (lazy load) */}
                <div className={cx('featured-product')}>
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default Home;
