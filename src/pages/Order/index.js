import React from 'react';
import classNames from 'classnames/bind';

import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function Order() {
    let order = { productBuy: [] };
    if (localStorage && localStorage.getItem('Order')) {
        order = JSON.parse(localStorage.getItem('Order'));
    }

    // console.log(order);

    const RenderBody = () => {
        return order.productBuy.map((prd, index) => (
            <tr key={index} className={cx('row')}>
                {index === 0 && (
                    <>
                        <>
                            <td className={cx('col-1')}>{order.id}</td>
                            <td className={cx('col-2')}>{order.fullname}</td>
                            <td className={cx('col-3')}>{order.address}</td>
                            <td className={cx('col-1')}>{order.phone}</td>
                        </>
                        <td className={cx('col-2')}>{prd.productName}</td>
                        <td className={cx('col-1')}>{prd.quantity}</td>
                        <td className={cx('col-1')}>Đang chờ...</td>
                        <td className={cx('col-1')}>Đã hủy</td>
                    </>
                )}
                {index >= 1 && (
                    <>
                        <td className={cx('col-2', 'offset-7')}>{prd.productName}</td>
                        <td className={cx('col-1')}>{prd.quantity}</td>
                        <td className={cx('col-1')}>Đang chờ...</td>
                        <td className={cx('col-1')}>Đã hủy</td>
                    </>
                )}
            </tr>
        ));
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}>
                <table className={cx('table')}>
                    <thead className={cx('table-header')}>
                        <tr className={cx('row')}>
                            <th className={cx('col-1')}>ID</th>
                            <th className={cx('col-2')}>Tên khách hàng</th>
                            <th className={cx('col-3')}>Địa chỉ</th>
                            <th className={cx('col-1')}>Số điện thoại</th>
                            <th className={cx('col-2')}>Danh sách mua</th>
                            <th className={cx('col-1')}>Số lượng</th>
                            <th className={cx('col-1')}>Tình trạng đơn hàng</th>
                            <th className={cx('col-1')}>Hủy đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody className={cx('table-main')}>
                        <RenderBody />
                    </tbody>
                    <tfoot className={cx('table-footer')}></tfoot>
                </table>
            </div>
        </div>
    );
}

export default Order;
