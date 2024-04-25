import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormUpdateCategory.module.scss';
import Button from '~/components/common/Button';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { actionUpdateCategoryApi } from '~/actions/CategoryAction';

const cx = classNames.bind(styles);

function FormUpdateCategory({ categoryUpdate }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (categoryUpdate) {
            const { id, name } = categoryUpdate;
            setId(id);
            setName(name);
        }
    }, [categoryUpdate]);

    const success = (updatedCategory) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn sửa danh mục <strong style={{ textTransform: 'capitalize' }}>{name}</strong> không?
                </span>
            ),

            onOk() {
                dispatch(actionUpdateCategoryApi(categoryUpdate.id, updatedCategory));
                handleReset();
            },
            onCancel() {},
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedCategory = { name };
        success(updatedCategory);
    };

    const handleReset = () => {
        setName('');
    };

    if (!categoryUpdate) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('wrap')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-header')}>
                    <p>Update Category</p>
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

export default FormUpdateCategory;
