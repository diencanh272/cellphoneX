import classNames from 'classnames/bind';

import styles from './FormCreateCategory.module.scss';
import Button from '~/components/common/Button';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import { actionCreateCategoryApi } from '~/actions/CategoryAction';

const cx = classNames.bind(styles);

function FormCreateCategory() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
    }, [dispatch]);

    const success = (newCategory) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn thêm mới danh mục <strong style={{ textTransform: 'capitalize' }}>{name}</strong>
                    không?
                </span>
            ),

            onOk() {
                dispatch(actionCreateCategoryApi(newCategory));
                handleReset();
            },
            onCancel() {},
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = { name };
        success(newCategory);
    };

    const handleReset = () => {
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={cx('form-group')}>
                <label className={cx('label')}>ID</label>
                <input className={cx('input')} type="text" disabled placeholder="Không cần nhập..." />
            </div>

            <div className={cx('form-group')}>
                <label className={cx('label')}>Category </label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Category name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

export default FormCreateCategory;
