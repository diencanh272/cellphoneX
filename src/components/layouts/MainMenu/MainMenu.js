import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './MainMenu.module.scss';
import { MailOutlined } from '@ant-design/icons';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import { actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';

const cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const onClick = (e) => {
    console.log('click', e);
};
function MainMenu() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    // const manufacturer = useSelector((state) => state.manufacturer);

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);
    // console.log(categories);
    // console.log(manufacturer);

    // const items = [
    //     getItem('Navigation One', 'sub1', <MailOutlined />, [
    //         getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    //         getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    //     ]),
    //     getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //         getItem('Option 5', '5'),
    //         getItem('Option 6', '6'),
    //         getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    //     ]),
    //     getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    //         getItem('Option 9', '9'),
    //         getItem('Option 10', '10'),
    //         getItem('Option 11', '11'),
    //         getItem('Option 12', '12'),
    //     ]),
    // ];

    const items = categories.map((category, index) => getItem(`${category.name}`, `${index}`, <MailOutlined />));
    return (
        <div className={cx('wrap')}>
            <Menu className={cx('list')} onClick={onClick} mode="vertical" items={items} />
        </div>
    );
}
export default MainMenu;
