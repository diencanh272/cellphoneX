import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TooltipModal.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBell, faGears, faTruckFast, faUserTie } from '@fortawesome/free-solid-svg-icons';
import ShortNameUser from '~/utils/helpers/shortNameUser';
import { useNavigate } from 'react-router-dom';
import { actionFetchListAccountApi } from '~/actions/AccountAction';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function TooltipModal() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const accounts = useSelector((state) => state.accounts);
    const dispatch = useDispatch();

    let accountLoginId;
    if (localStorage && localStorage.getItem('AccountId')) {
        accountLoginId = JSON.parse(localStorage.getItem('AccountId'));
    }

    useEffect(() => {
        if (accounts) {
            const getAccountLogin = accounts.find((acc) => acc.id === accountLoginId);
            setAccount(getAccountLogin);
        }
    }, [accounts, accountLoginId]);

    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);

    const handleLogOut = () => {
        if (localStorage && localStorage.getItem('AccountId')) {
            localStorage.clear();
            window.location.reload();
            setAccount(null);
        }
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    const activeAdmin = () => {
        if (account && account.status === 'ACTIVE') {
            // console.log('active admin');
            return (
                <Button
                    className={cx('btn')}
                    to={'/admin/dashboard'}
                    text
                    large
                    leftIcon={<FontAwesomeIcon icon={faGears} />}
                >
                    Admin
                </Button>
            );
        } else {
            // console.log('no active');
        }
    };

    const mainUserLogin = () => (
        <>
            <div className={cx('top-left')}>
                <ShortNameUser />
            </div>
            <div className={cx('top-right')}>
                <span className={cx('fullname')}>{account ? account.fullname : ''}</span>
                <span className={cx('username')}>{account ? `@${account.username}` : ''}</span>
            </div>
        </>
    );

    return (
        <div className={cx('wrap')}>
            <div className={cx('top-wrap')}>{mainUserLogin()}</div>
            <ul className={cx('list')}>
                <li className={cx('item')}>
                    <Button
                        className={cx('btn')}
                        to={'/account'}
                        text
                        large
                        leftIcon={<FontAwesomeIcon icon={faUserTie} />}
                    >
                        Tài khoản cá nhân
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button
                        to={'/order'}
                        className={cx('btn')}
                        text
                        large
                        leftIcon={<FontAwesomeIcon icon={faTruckFast} />}
                    >
                        Quản lý đơn hàng
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Button className={cx('btn')} text large leftIcon={<FontAwesomeIcon icon={faBell} />}>
                        Thông báo
                    </Button>
                </li>
                <li className={cx('item')}>{activeAdmin()}</li>
                <li className={cx('item')}>
                    <Button
                        className={cx('btn')}
                        text
                        large
                        leftIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                        onClick={() => {
                            handleLogOut();
                        }}
                    >
                        Đăng xuất tài khoản
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default TooltipModal;
