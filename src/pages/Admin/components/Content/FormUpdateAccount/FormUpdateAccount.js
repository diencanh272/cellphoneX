import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormUpdateAccount.module.scss';
import Button from '~/components/common/Button';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { defaultCreateDate } from '~/utils/helpers/defaultCreateDate';
import { actionUpdateAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function FormUpdateProduct({ accountUpdate }) {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [fullname, setFullName] = useState('');
    const [avatarImageName, setAvatarImageName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [createDate, setCreateDate] = useState({ defaultCreateDate });

    const dispatch = useDispatch();

    // Handle input file
    const handlePathImage = (e) => {
        const file = e.target.files[0].name;
        setAvatarImageName(file);
    };

    useEffect(() => {
        if (accountUpdate) {
            const { id, email, username, fullname, avatarImageName, mobile, address, createDate } = accountUpdate;
            setId(id);
            setEmail(email);
            setUserName(username);
            setAvatarImageName(avatarImageName);
            setFullName(fullname);
            setMobile(mobile);
            setAddress(address);
            setCreateDate(createDate);
        }
    }, [accountUpdate]);

    const success = (updatedProduct) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn sửa tài khoản <strong>{email}</strong> không?
                </span>
            ),

            onOk() {
                dispatch(actionUpdateAccountApi(accountUpdate.id, updatedProduct));
                handleReset();
            },
            onCancel() {},
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = { email, username, fullname, avatarImageName, mobile, address, createDate };
        success(updatedProduct);
    };

    const handleReset = () => {
        setEmail('');
        setUserName('');
        setAvatarImageName('');
        setFullName('');
        setMobile('');
        setAddress('');
        setCreateDate('');
    };

    if (!accountUpdate) {
        return <div>Loading...</div>; // Hoặc xử lý tùy thuộc vào trường hợp của bạn
    }

    return (
        <div className={cx('wrap')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-header')}>
                    <p>Update Account</p>
                </div>
                <div className={cx('form-input')}>
                    <div className={cx('field')}>
                        <label>ID</label>
                        <input style={{ cursor: 'no-drop' }} type="text" placeholder="ID input" disabled value={id} />
                    </div>
                    <div className={cx('field')}>
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            placeholder="Họ và tên..."
                            value={fullname}
                            onChange={(e) => {
                                setFullName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ email..."
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>

                    <div className={cx('field')}>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Nhập username..."
                            value={username}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại..."
                            value={mobile}
                            onChange={(e) => {
                                setMobile(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Chọn ảnh đại diện</label>
                        <input type="file" placeholder="avatar..." onChange={handlePathImage} />
                    </div>
                    <div className={cx('field')}>
                        <label>Địa chỉ</label>
                        <input
                            placeholder="Nhập địa chỉ..."
                            type="text"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Ngày tạo</label>
                        <input
                            value={createDate}
                            onChange={(e) => {
                                setCreateDate(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={cx('form-footer')}>
                    <Button primary type="submit">
                        Update
                    </Button>
                    <Button primary type="reset" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FormUpdateProduct;
