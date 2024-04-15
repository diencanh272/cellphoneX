import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './FormSignup.module.scss';
import Button from '~/components/common/Button';
import { defaultCreateDate } from '~/utils/helpers/defaultCreateDate';
import { useDispatch } from 'react-redux';
import { actionCreateNewAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function FormSignup() {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [avatarImageName, setAvatarImageName] = useState('');
    const [address, setAddress] = useState('');
    const [createDate, setCreateDate] = useState(defaultCreateDate);
    const [status, setStatus] = useState('');

    const [validate, setValidate] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePathImage = (e) => {
        const file = e.target.files[0].name;
        setAvatarImageName(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newAccount = {
            fullname,
            username,
            email,
            mobile,
            password,
            avatarImageName,
            address,
            createDate,
            status,
        };

        if (password !== newPassword) {
            setValidate(true);
        } else {
            dispatch(actionCreateNewAccountApi(newAccount)).then(() => {
                localStorage.setItem('Account', JSON.stringify(newAccount));
                navigate('/');
                handleReset();
            });
        }

        console.log(newAccount);
    };

    const handleReset = () => {
        setFullname('');
        setUsername('');
        setEmail('');
        setMobile('');
        setPassword('');
        setNewPassword('');
        setAvatarImageName(null);
        setAddress('');
        setCreateDate('');
        setStatus('');
    };

    return (
        <div className={cx('wrap')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input', 'fullname-input')}
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Nhập Họ và tên"
                        required
                    />
                    <label className={cx('label')}>Họ và tên (*)</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập username"
                        required
                    />
                    <label className={cx('label')}>Nhập username</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Nhập số điện thoại"
                        required
                    />
                    <label className={cx('label')}>Nhập số điện thoại (*)</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                        required
                        maxLength={255}
                        autoComplete="username"
                    />
                    <label className={cx('label')}>Nhập email (*)</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                        autoComplete="new-password"
                    />
                    <label className={cx('label')}>Nhập mật khẩu (*)</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        required
                        autoComplete="new-password"
                    />
                    {validate && <span>Mật khẩu không trùng khớp!!</span>}
                    <label className={cx('label')}>Nhập lại mật khẩu</label>
                </div>

                <div className={cx('box-input')}>
                    <input className={cx('input')} type="file" onChange={handlePathImage} required />
                    <label className={cx('label')}>Chọn avatar</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nhập địa chỉ"
                        required
                    />
                    <label className={cx('label')}>Nhập địa chỉ</label>
                </div>
                <div className={cx('box-input')}>
                    <input
                        className={cx('input')}
                        type="date"
                        value={defaultCreateDate}
                        onChange={(e) => setCreateDate(e.target.value)}
                    />
                    <label className={cx('label')}>Create date</label>
                </div>

                <Button className={cx('btn')} type="submit" large primary>
                    Đăng kí
                </Button>
            </form>

            <div className={cx('question')}>
                <p>Bạn đã có tài khoản?</p>
                <Link to={'/account/register'}>Đăng nhập ngay</Link>
            </div>
        </div>
    );
}

export default FormSignup;
