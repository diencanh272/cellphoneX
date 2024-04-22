import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './ShowStarRating.module.scss';

const cx = classNames.bind(styles);

function ShowStarRating({ starRating }) {
    let stars = [];
    // Thêm các icon sao được đánh giá
    for (let i = 0; i < starRating; i++) {
        stars.push(<FontAwesomeIcon style={{ color: '#f59e0b' }} key={i} icon={faStar} />);
    }
    // Thêm các icon sao không được đánh giá
    for (let i = starRating; i < 5; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ opacity: 0.3 }} />);
    }
    return (
        <div className={cx('wrap')}>
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
}

export default ShowStarRating;
