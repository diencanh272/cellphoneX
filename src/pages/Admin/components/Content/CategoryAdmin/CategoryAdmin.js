import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './CategoryAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import PopupConfirm from '~/components/common/Modal/PopupConfirm';
import Pagination from '~/components/common/Pagination';
import { Modal } from 'antd';
import { actionDeleteCategoryApi } from '~/actions/CategoryAction';
import FormUpdateCategory from '../FormUpdateCategory';

const cx = classNames.bind(styles);

function CategoryAdmin() {
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState({});

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
    }, [dispatch]);

    //Pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(5);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastProductPerPage = currentPage * productPerPage;
    const indexOfFirstProductPerPage = indexOfLastProductPerPage - productPerPage;
    const currentProductsOnPage = categories.slice(indexOfFirstProductPerPage, indexOfLastProductPerPage);
    //Pagination end

    const confirmDelete = () => {
        dispatch(actionDeleteCategoryApi(id));
        setModalOpenDelete(false);
    };
    const handleDelete = (id, name) => {
        setName(name);
        setId(id);
        setModalOpenDelete(true);
    };

    const handleEdit = (id) => {
        setModalOpenUpdate(true);
        const categoryUpdate = categories.find((category) => category.id === id);
        setCategoryUpdate(categoryUpdate);
    };

    const category = currentProductsOnPage.map((category, index) => (
        <tr className={cx('row')} key={index}>
            <td className={cx('col-1')}>{category.id}</td>
            <td className={cx('col-2')}>{category.name}</td>

            <td className={cx('col-3')}>
                <Button leftIcon={<FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(category.id)} />} />
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => handleDelete(category.id, category.name)}
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
                    </tr>
                </thead>
                <tbody className={cx('table-main')}>{category}</tbody>
                <tfoot className={cx('table-footer')}>
                    <tr className={cx('wrap')}>
                        <td>
                            <Pagination
                                currentPage={currentPage}
                                productPerPage={productPerPage}
                                paginate={paginate}
                                totalProduct={categories.length}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>

            <Modal centered open={modalOpenDelete} footer={null} onCancel={() => setModalOpenDelete(false)} width={350}>
                <PopupConfirm
                    title={'danh mục'}
                    productName={name}
                    btnYes={confirmDelete}
                    btnNo={() => setModalOpenDelete(false)}
                />
            </Modal>
            <Modal centered open={modalOpenUpdate} footer={null} onCancel={() => setModalOpenUpdate(false)}>
                <FormUpdateCategory categoryUpdate={categoryUpdate} />
            </Modal>
        </div>
    );
}

export default CategoryAdmin;
