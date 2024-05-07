import classNames from 'classnames/bind';
import styles from './AccountAdmin.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';
import { actionDeleteAccountApi, actionFetchListAccountApi } from '~/actions/AccountAction';
import Pagination from '~/components/common/Pagination';
import { Modal } from 'antd';
import FormUpdateAccount from '../FormUpdateAccount';
import SearchAdmin from '~/components/layouts/SearchAdmin';

const cx = classNames.bind(styles);

function AccountAdmin() {
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
    const [accountUpdate, setAccountUpdate] = useState({});
    const [searchedAccount, setSearchedAccount] = useState([]);
    const [mapping, setMapping] = useState(false);

    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);

    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);

    //Pagination start
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(5);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastProductPerPage = currentPage * productPerPage;
    const indexOfFirstProductPerPage = indexOfLastProductPerPage - productPerPage;
    const currentAccountOnPage = accounts.slice(indexOfFirstProductPerPage, indexOfLastProductPerPage);
    //Pagination end

    const handleDelete = (id, email) => {
        success(id, email);
    };

    const success = (id, email) => {
        Modal.success({
            content: <span>Bạn có muốn xóa tài khoản {email} không?</span>,
            onOk() {
                dispatch(actionDeleteAccountApi(id));
            },
            onCancel() {},
        });
    };

    const handleEdit = (accountId) => {
        setModalOpenUpdate(true);
        const accountUpdate = accounts.find((product) => product.id === accountId);
        setAccountUpdate(accountUpdate);
    };

    const handleSearch = (searchResult) => {
        setSearchedAccount(searchResult);
    };

    const handleMapping = (result) => {
        setMapping(result);
    };

    const renderPagination =
        (searchedAccount.length > 0 && searchedAccount.length !== accounts.length) || mapping ? (
            ''
        ) : (
            <tfoot className={cx('table-footer')}>
                <tr className={cx('wrap')}>
                    <td>
                        <Pagination
                            currentPage={currentPage}
                            productPerPage={productPerPage}
                            paginate={paginate}
                            totalProduct={accounts.length}
                        />
                    </td>
                </tr>
            </tfoot>
        );

    const renderAccountAdmin =
        searchedAccount.length > 0 && searchedAccount.length !== accounts.length ? (
            searchedAccount.map((acc, index) => (
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
                        <Button
                            className={cx('action')}
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(acc.id)} />}
                        />
                        <Button
                            className={cx('action')}
                            leftIcon={
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(acc.id, acc.email)} />
                            }
                        />
                    </td>
                </tr>
            ))
        ) : mapping ? (
            <p>Không có tài khoản nào!</p>
        ) : (
            currentAccountOnPage.map((acc, index) => (
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
                        <Button
                            className={cx('action')}
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(acc.id)} />}
                        />
                        <Button
                            className={cx('action')}
                            leftIcon={
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(acc.id, acc.email)} />
                            }
                        />
                    </td>
                </tr>
            ))
        );

    return (
        <div className={cx('wrap')}>
            <div className={cx('row', 'search-account')}>
                <div className={cx('col-5', 'offset-4')}>
                    <SearchAdmin accounts={accounts} onSearch={handleSearch} onMapping={handleMapping} />
                </div>
            </div>
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
                <tbody className={cx('table-main')}>{renderAccountAdmin}</tbody>
                {renderPagination}
            </table>

            <Modal centered open={modalOpenUpdate} footer={null} onCancel={() => setModalOpenUpdate(false)}>
                <FormUpdateAccount accountUpdate={accountUpdate} />
            </Modal>
        </div>
    );
}

export default AccountAdmin;
