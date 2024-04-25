import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './FormLogin.module.scss';
import Button from '~/components/common/Button';
import { actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function FormLogin() {
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(true);

    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    // console.log(accounts);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);

    // console.log(userLogin);

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        const timeNavigate = () => {
            setTimeout(() => {
                navigate('/');
            }, 1500);
        };

        const checkAccount = accounts.find((acc) => acc.email === accountName || acc.mobile === accountName);

        if (checkAccount) {
            localStorage.setItem('Account', JSON.stringify(checkAccount));
            // console.log(checkAccount);
            // console.log('login success');
            timeNavigate();
        } else if (checkAccount === undefined) {
            console.log('Account not exist');
            setLogin(false);
        }
    };

    const LoginFail = () =>
        login ? '' : <p className={cx('login-fail-text')}>Tài khoản hoặc mật khẩu không chính xác!!</p>;

    return (
        <div className={cx('wrap')}>
            <form onSubmit={handleSubmitLogin}>
                <div className={cx('login-fail-wrap')}>
                    <LoginFail />
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="Nhập số điện thoại/email"
                        required
                        autoComplete="off"
                        value={accountName}
                        onChange={(e) => {
                            setAccountName(e.target.value);
                            setLogin(true);
                        }}
                    />
                    <label className={cx('label')}>Số điện thoại/ email</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="password"
                        placeholder="Nhập mật khẩu"
                        required
                        autoComplete="off"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setLogin(true);
                        }}
                    />
                    <label className={cx('label')}>Mật khẩu</label>
                </div>
                <div className={cx('forget')}>
                    <p>Quên mật khẩu?</p>
                </div>

                <Button className={cx('btn')} type="submit" large primary>
                    Đăng nhập
                </Button>
            </form>

            <div className={cx('question')}>
                <p>Bạn chưa có tài khoản?</p>
                <Link to={'/account/signup'}>Đăng kí ngay</Link>
            </div>
            <Link className={cx('policy')} to={'/'}>
                Xem chính sách ưu đãi Smember
            </Link>
        </div>
    );
}

export default FormLogin;
