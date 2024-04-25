import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormUpdateManu.module.scss';
import Button from '~/components/common/Button';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { actionUpdateManufacturerApi } from '~/actions/ManufacturerAction';

const cx = classNames.bind(styles);

function FormUpdateManu({ manuUpdate }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (manuUpdate) {
            const { id, name, logo } = manuUpdate;
            setId(id);
            setName(name);
            setLogo(logo);
        }
    }, [manuUpdate]);

    const success = (updatedManu) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn sửa nhà sản xuất <strong style={{ textTransform: 'capitalize' }}>{name}</strong> không?
                </span>
            ),

            onOk() {
                dispatch(actionUpdateManufacturerApi(manuUpdate.id, updatedManu));
                handleReset();
            },
            onCancel() {},
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedManu = { name, logo };
        success(updatedManu);
    };

    const handleReset = () => {
        setName('');
        setLogo('');
    };

    if (!manuUpdate) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('wrap')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-header')}>
                    <p>Update Manufacturer</p>
                </div>
                <div className={cx('form-input')}>
                    <div className={cx('field')}>
                        <label>ID</label>
                        <input style={{ cursor: 'no-drop' }} type="text" placeholder="ID input" disabled value={id} />
                    </div>
                    <div className={cx('field')}>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Product name input..."
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Logo</label>
                        <input
                            type="text"
                            placeholder="Logo URL image..."
                            value={logo}
                            onChange={(e) => {
                                setLogo(e.target.value);
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

export default FormUpdateManu;
