import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Order.module.scss';
import { actionFetchListOrderAPI } from '~/actions/OrderAction';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Order() {
    let accountId;
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    // console.log(orders);
    if (localStorage && localStorage.getItem('AccountId')) {
        accountId = JSON.parse(localStorage.getItem('AccountId'));
    }

    let ordersInAccount = [];
    if (accountId) {
        ordersInAccount = orders.filter((order) => order.accountId === accountId);
    }
    // console.log(ordersInAccount);
    // console.log(productBuys);

    useEffect(() => {
        dispatch(actionFetchListOrderAPI());
    }, [dispatch]);

    const RenderBody = () => {
        return ordersInAccount.map((order, index) => (
            <tr key={index} className={cx('row')}>
                <td className={cx('col-1')}>{index + 1}</td>
                <td className={cx('col-2')}>{order.fullname}</td>
                <td className={cx('col-2')}>{order.address}</td>
                <td className={cx('col-2')}>{order.phone}</td>
                <td className={cx('col-3')}>
                    {order.productBuy &&
                        order.productBuy.map((prd, idx) => (
                            <p key={idx} className={cx('name-wrap')}>
                                <span className={cx('word-clamp', 'width-word-clamp')}>{`${prd.productName}`}</span>
                                <strong> {`(${prd.quantity})`}</strong>
                            </p>
                        ))}
                </td>
                <td className={cx('col-1')}>Đang chờ...</td>
                <td className={cx('col-1')}>{order.note}</td>
            </tr>
        ));
    };

    return (
        <div className={cx('wrap')}>
            <table className={cx('table')}>
                <thead className={cx('table-header')}>
                    <tr className={cx('row')}>
                        <th className={cx('col-1')}>STT</th>
                        <th className={cx('col-2')}>Tên khách hàng</th>
                        <th className={cx('col-2')}>Địa chỉ</th>
                        <th className={cx('col-2')}>Số điện thoại</th>
                        <th className={cx('col-3')}>
                            Danh sách mua<strong>(Số lượng)</strong>
                        </th>
                        <th className={cx('col-1')}>Tình trạng đơn hàng</th>
                        <th className={cx('col-1')}>Note</th>
                    </tr>
                </thead>
                <tbody className={cx('table-main')}>
                    <RenderBody />
                </tbody>
                <tfoot className={cx('table-footer')}></tfoot>
            </table>
        </div>
    );
}

export default Order;
