import classNames from 'classnames/bind';

import styles from './FormCreateManu.module.scss';
import Button from '~/components/common/Button';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { actionCreateManufacturerApi, actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';

const cx = classNames.bind(styles);

function FormCreateManu() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);

    const success = (newManu) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn thêm mới nhà sản xuất <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
                    không?
                </span>
            ),

            onOk() {
                dispatch(actionCreateManufacturerApi(newManu));
                handleReset();
            },
            onCancel() {},
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newManu = { name, logoUrl };
        success(newManu);
    };

    const handleReset = () => {
        setName('');
        setLogoUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={cx('form-group')}>
                <label className={cx('label')}>ID</label>
                <input className={cx('input')} type="text" disabled placeholder="Không cần nhập..." />
            </div>

            <div className={cx('form-group')}>
                <label className={cx('label')}>Manufacturer </label>
                <input
                    className={cx('input')}
                    style={{ textTransform: 'uppercase' }}
                    type="text"
                    placeholder="Manufacturer name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={cx('form-group')}>
                <label className={cx('label')}>Logo</label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Logo URL image..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                />
            </div>
            <div className={cx('action')}>
                <Button type={'submit'} primary>
                    OK
                </Button>
                <Button primary>Reset</Button>
            </div>
        </form>
    );
}

export default FormCreateManu;
