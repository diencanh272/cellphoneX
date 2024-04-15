import classNames from 'classnames/bind';

import styles from './ManufacturerAdmin.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';
import { actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';

const cx = classNames.bind(styles);

function ManufacturerAdmin() {
    const dispatch = useDispatch();
    const manufacturers = useSelector((state) => state.manufacturers);

    useEffect(() => {
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);

    const cate = manufacturers.map((cate, index) => (
        <tr className={cx('row')} key={index}>
            <td className={cx('col-1')}>{cate.id}</td>
            <td className={cx('col-2')}>{cate.name}</td>
            <td className={cx('col-3')}>
                <Button leftIcon={<FontAwesomeIcon icon={faPenToSquare} />} />
                <Button leftIcon={<FontAwesomeIcon icon={faTrash} />} />
            </td>
        </tr>
    ));

    return (
        <div className={cx('wrap')}>
            <table className={cx('table')}>
                <thead className={cx('table-header')}>
                    <tr className={cx('row')}>
                        <td className={cx('col-1')}>ID</td>
                        <td className={cx('col-2')}>Name</td>
                    </tr>
                </thead>
                <tbody className={cx('table-main')}>{cate}</tbody>
                <tfoot className={cx('table-footer')}></tfoot>
            </table>
        </div>
    );
}

export default ManufacturerAdmin;
