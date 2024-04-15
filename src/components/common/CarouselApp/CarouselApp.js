import React from 'react';
import { Carousel } from 'antd';
import classNames from 'classnames/bind';

import styles from './CarouselApp.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CarouselApp() {
    return (
        <Carousel autoplay dotPosition={'top'}>
            <Link to={'detail'}>
                <img className={cx('img')} src={images.carousel1} alt="" />
            </Link>

            <Link to={'detail'}>
                <img className={cx('img')} src={images.carousel2} alt="" />
            </Link>
            <Link to={'detail'}>
                <img className={cx('img')} src={images.carousel3} alt="" />
            </Link>
            <Link to={'detail'}>
                <img className={cx('img')} src={images.carousel4} alt="" />
            </Link>
        </Carousel>
    );
}

export default CarouselApp;
