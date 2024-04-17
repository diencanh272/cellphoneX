import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './MainMenu.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import { actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';

const cx = classNames.bind(styles);

function MainMenu() {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const manufacturers = useSelector((state) => state.manufacturers);

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);

    const handleCategoryMouseEnter = (index) => {
        setHoveredCategory(index);
    };

    const handleCategoryMouseLeave = () => {
        setHoveredCategory(null);
    };

    const manufacturerMenu = manufacturers.map((manu, index) => (
        <li className={cx('manu-item')} key={index}>
            {manu.name}
        </li>
    ));

    const categoryMenu = categories.map((cate, index) => (
        <li
            key={index}
            className={cx('category-item')}
            onMouseEnter={() => handleCategoryMouseEnter(index)}
            onMouseLeave={handleCategoryMouseLeave}
        >
            {cate.name}
            {hoveredCategory === index && <ul className={cx('manu-list')}>{manufacturerMenu}</ul>}
        </li>
    ));

    return (
        <div className={cx('wrap')}>
            <ul className={cx('category-list')}>{categoryMenu}</ul>
        </div>
    );
}

export default MainMenu;
