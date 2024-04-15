import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './ProductsAdmin.module.scss';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { actionDeleteProductApi, actionFetchListProductApi } from '~/actions/ProductAction';
import Modal from 'antd/es/modal/Modal';
import PopupConfirm from '~/components/common/Modal/PopupConfirm';
import FormUpdateProduct from '../FormUpdateProduct';

const cx = classNames.bind(styles);

function ProductsAdmin() {
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [productUpdate, setProductUpdate] = useState({});
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
    }, [dispatch]);

    const handleDelete = (productId, productName) => {
        setProductName(productName);
        setProductId(productId);
        setModalOpenDelete(true);
    };
    const confirmDelete = () => {
        dispatch(actionDeleteProductApi(productId))
            .then((response) => {
                dispatch(actionFetchListProductApi(response));
            })
            .catch((error) => {
                return error;
            });

        setModalOpenDelete(false);
    };

    const handleEdit = (productId) => {
        setModalOpenUpdate(true);
        const productUpdate = products.find((product) => product.id === productId);
        setProductUpdate({ productUpdate });
    };

    const renderProductAdmin = products.map((product, index) => {
        return (
            <tr className={cx('row')} key={index}>
                <td className={cx('col-1')}>{product.id}</td>
                <td className={cx('col-1')}>
                    <img className={cx('thumb')} src={product.imageName} alt={product.imageName} />
                </td>
                <td className={cx('col-3')}>{product.name}</td>
                <td className={cx('col-2')}>{product.categoryName}</td>
                <td className={cx('col-2')}>{product.manufacturerName}</td>
                <td className={cx('col-2')}>{product.price}</td>
                <td className={cx('col-1', 'btn')}>
                    <Button
                        leftIcon={
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                onClick={() => {
                                    handleEdit(product.id);
                                }}
                            />
                        }
                    />
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                            handleDelete(product.id, product.name);
                        }}
                    />
                    <Button leftIcon={<FontAwesomeIcon icon={faEye} />} />
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className={cx('main')}>
                <table className={cx('table')}>
                    <thead className={cx('table-header')}>
                        <tr className={cx('row')}>
                            <td className={cx('col-1')}>ID</td>
                            <td className={cx('col-1')}>Thumb</td>
                            <td className={cx('col-3')}>Name</td>
                            <td className={cx('col-2')}>Category</td>
                            <td className={cx('col-2')}>Manufacturer</td>
                            <td className={cx('col-2')}>Price</td>
                            <td className={cx('col-1')}></td>
                        </tr>
                    </thead>
                    <tbody className={cx('table-main')}>{renderProductAdmin}</tbody>
                    <tfoot className={cx('table-footer')}></tfoot>
                </table>
            </div>

            <Modal centered open={modalOpenDelete} footer={null} onCancel={() => setModalOpenDelete(false)} width={350}>
                <PopupConfirm
                    productName={productName}
                    btnYes={confirmDelete}
                    btnNo={() => setModalOpenDelete(false)}
                />
            </Modal>
            <Modal centered open={modalOpenUpdate} footer={null} onCancel={() => setModalOpenUpdate(false)}>
                <FormUpdateProduct productUpdate={productUpdate} />
            </Modal>
        </>
    );
}

export default ProductsAdmin;
