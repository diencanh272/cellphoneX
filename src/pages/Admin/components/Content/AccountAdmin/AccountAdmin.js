import classNames from 'classnames/bind';
import styles from './AccountAdmin.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';
import { actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function AccountAdmin() {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);

    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);

    const account = accounts.map((acc, index) => (
        <tr className={cx('row')} key={index}>
            <td className={cx('col-1')}>{acc.id}</td>
            <td title={acc.email} className={cx('col-2', 'word-clamp')}>
                {acc.email}
            </td>
            <td className={cx('col-1')}>{acc.username}</td>
            <td title={acc.fullname} className={cx('col-1', 'word-clamp')}>
                {acc.fullname}
            </td>
            <td className={cx('col-2')}>{acc.mobile}</td>
            <td title={acc.address} className={cx('col-2', 'word-clamp')}>
                {acc.address}
            </td>
            <td className={cx('col-1')}>{acc.createDate}</td>
            <td className={cx('col-1')}>{acc.status}</td>
            <td className={cx('col-1')}>
                <Button className={cx('action')} leftIcon={<FontAwesomeIcon icon={faPenToSquare} />} />
                <Button className={cx('action')} leftIcon={<FontAwesomeIcon icon={faTrash} />} />
            </td>
        </tr>
    ));

    return (
        <div className={cx('wrap')}>
            <table className={cx('table')}>
                <thead className={cx('table-header')}>
                    <tr className={cx('row')}>
                        <td className={cx('col-1')}>ID</td>
                        <td className={cx('col-2')}>Email</td>
                        <td className={cx('col-1')}>User Name</td>
                        <td className={cx('col-1')}>Full Name</td>
                        <td className={cx('col-2')}>Phone</td>
                        <td className={cx('col-2')}>Address</td>
                        <td className={cx('col-1')}>Date</td>
                        <td className={cx('col-1')}>Status</td>
                        <td className={cx('col-1')}></td>
                    </tr>
                </thead>
                <tbody className={cx('table-main')}>{account}</tbody>
                <tfoot className={cx('table-footer')}></tfoot>
            </table>
        </div>
    );
}

export default AccountAdmin;
