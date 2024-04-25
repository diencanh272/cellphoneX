import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './ManufacturerAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';
import { actionDeleteManufacturerApi, actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';
import PopupConfirm from '~/components/common/Modal/PopupConfirm';
import Pagination from '~/components/common/Pagination';
import FormUpdateManu from '../FormUpdateManu';
import { Modal } from 'antd';

const cx = classNames.bind(styles);

function ManufacturerAdmin() {
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
    const [manuUpdate, setManuUpdate] = useState({});

    const [productName, setProductName] = useState('');
    const [id, setId] = useState('');
    const dispatch = useDispatch();
    const manufacturers = useSelector((state) => state.manufacturers);

    useEffect(() => {
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);

    //Pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(5);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastProductPerPage = currentPage * productPerPage;
    const indexOfFirstProductPerPage = indexOfLastProductPerPage - productPerPage;
    const currentProductsOnPage = manufacturers.slice(indexOfFirstProductPerPage, indexOfLastProductPerPage);
    //Pagination end

    const confirmDelete = () => {
        dispatch(actionDeleteManufacturerApi(id));
        setModalOpenDelete(false);
    };
    const handleDelete = (id, name) => {
        setProductName(name);
        setId(id);
        setModalOpenDelete(true);
    };

    const handleEdit = (id) => {
        setModalOpenUpdate(true);
        const manuUpdate = manufacturers.find((manu) => manu.id === id);
        setManuUpdate(manuUpdate);
    };

    const manu = currentProductsOnPage.map((manu, index) => (
        <tr className={cx('row')} key={index}>
            <td className={cx('col-1')}>{manu.id}</td>
            <td className={cx('col-2')}>{manu.name}</td>
            <td className={cx('col-1', 'thumb-wrap')}>
                <img className={cx('thumb')} src={manu.logo} alt={manu.name} />
            </td>
            <td className={cx('col-3')}>
                <Button leftIcon={<FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(manu.id)} />} />
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => handleDelete(manu.id, manu.name)}
                />
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
                        <td className={cx('col-1')}>Logo</td>
                    </tr>
                </thead>
                <tbody className={cx('table-main')}>{manu}</tbody>
                <tfoot className={cx('table-footer')}>
                    <Pagination
                        currentPage={currentPage}
                        productPerPage={productPerPage}
                        paginate={paginate}
                        totalProduct={manufacturers.length}
                    />
                </tfoot>
            </table>

            <Modal centered open={modalOpenDelete} footer={null} onCancel={() => setModalOpenDelete(false)} width={350}>
                <PopupConfirm
                    title={'nhà sản xuất'}
                    productName={productName}
                    btnYes={confirmDelete}
                    btnNo={() => setModalOpenDelete(false)}
                />
            </Modal>
            <Modal centered open={modalOpenUpdate} footer={null} onCancel={() => setModalOpenUpdate(false)}>
                <FormUpdateManu manuUpdate={manuUpdate} />
            </Modal>
        </div>
    );
}

export default ManufacturerAdmin;
