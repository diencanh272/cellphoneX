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
import Pagination from '~/components/common/Pagination';
import SearchAdmin from '~/components/layouts/SearchAdmin';

const cx = classNames.bind(styles);

function ProductsAdmin() {
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [productUpdate, setProductUpdate] = useState({});
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [mapping, setMapping] = useState(false);

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(actionFetchListProductApi());
    }, [dispatch]);

    //Pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(10);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastProductPerPage = currentPage * productPerPage;
    const indexOfFirstProductPerPage = indexOfLastProductPerPage - productPerPage;
    const currentProductsOnPage = products.slice(indexOfFirstProductPerPage, indexOfLastProductPerPage);
    //Pagination end

    const handleDelete = (productId, productName) => {
        setProductName(productName);
        setProductId(productId);
        setModalOpenDelete(true);
    };
    const confirmDelete = () => {
        dispatch(actionDeleteProductApi(productId))
            .then((response) => {
                dispatch(actionFetchListProductApi());
            })
            .catch((error) => {
                return error;
            });

        setModalOpenDelete(false);
    };

    const handleEdit = (productId) => {
        setModalOpenUpdate(true);
        const productUpdate = products.find((product) => product.id === productId);
        setProductUpdate(productUpdate);
    };

    const handleSearch = (searchResult) => {
        setSearchedProducts(searchResult);
    };

    const handleMapping = (result) => {
        setMapping(result);
    };

    const renderPagination =
        searchedProducts.length > 0 && searchedProducts.length !== products.length ? (
            ''
        ) : (
            <tfoot className={cx('table-footer')}>
                <tr className={cx('wrap')}>
                    <td>
                        <Pagination
                            currentPage={currentPage}
                            productPerPage={productPerPage}
                            paginate={paginate}
                            totalProduct={products.length}
                        />
                    </td>
                </tr>
            </tfoot>
        );

    const renderProductAdmin =
        searchedProducts.length > 0 && searchedProducts.length !== products.length ? (
            searchedProducts.map((product, index) => {
                return (
                    <tr className={cx('row')} key={index}>
                        <td className={cx('col-1')}>{product.id}</td>
                        <td className={cx('col-1', 'td-thumb')}>
                            <img className={cx('thumb')} src={product.imageName} alt={product.imageName} />
                        </td>
                        <td className={cx('col-3')}>{product.name}</td>
                        <td className={cx('col-2')}>{product.categoryName}</td>
                        <td className={cx('col-2')}>{product.manufacturerName}</td>
                        <td className={cx('col-2')}>{`${product.price}₫`}</td>
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
            })
        ) : mapping ? (
            <p>Không có sản phẩm nào!</p>
        ) : (
            currentProductsOnPage.map((product, index) => {
                return (
                    <tr className={cx('row')} key={index}>
                        <td className={cx('col-1')}>{product.id}</td>
                        <td className={cx('col-1', 'td-thumb')}>
                            <img className={cx('thumb')} src={product.imageName} alt={product.imageName} />
                        </td>
                        <td className={cx('col-3')}>{product.name}</td>
                        <td className={cx('col-2')}>{product.categoryName}</td>
                        <td className={cx('col-2')}>{product.manufacturerName}</td>
                        <td className={cx('col-2')}>{`${product.price}₫`}</td>
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
            })
        );

    return (
        <>
            <div className={cx('main')}>
                <div className={cx('row', 'search-product')}>
                    <div className={cx('col-5', 'offset-4')}>
                        <SearchAdmin products={products} onSearch={handleSearch} onMapping={handleMapping} />
                    </div>
                </div>

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
                    {renderPagination}
                </table>
            </div>

            <Modal centered open={modalOpenDelete} footer={null} onCancel={() => setModalOpenDelete(false)} width={350}>
                <PopupConfirm
                    title={'sản phẩm'}
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
