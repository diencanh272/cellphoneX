import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormUpdateProduct.module.scss';
import Button from '~/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import { actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';
import { actionUpdateProductApi } from '~/actions/ProductAction';
import { Modal } from 'antd';

const cx = classNames.bind(styles);

function FormUpdateProduct({ productUpdate, setModal }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [info, setInfo] = useState('');
    const [detail, setDetail] = useState('');
    const [ratingStar, setRatingStar] = useState('');
    const [imageName, setImageName] = useState('');
    const [manufacturerName, setManufacturerName] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const manufacturers = useSelector((state) => state.manufacturers);

    useEffect(() => {
        if (productUpdate) {
            const { id, name, price, info, detail, ratingStar, imageName, manufacturerName, categoryName } =
                productUpdate;
            setId(id);
            setName(name);
            setPrice(price);
            setInfo(info);
            setDetail(detail);
            setRatingStar(ratingStar);
            setImageName(imageName);
            setManufacturerName(manufacturerName);
            setCategoryName(categoryName);
        }
    }, [productUpdate]);

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch, productUpdate]);

    const success = (updatedProduct) => {
        Modal.confirm({
            content: (
                <span>
                    Bạn có muốn sửa sản phẩm <strong style={{ textTransform: 'capitalize' }}>{name}</strong> không?
                </span>
            ),

            onOk() {
                dispatch(actionUpdateProductApi(productUpdate.id, updatedProduct));
                handleReset();
                setModal();
            },
            onCancel() {},
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = { name, price, info, detail, ratingStar, imageName, manufacturerName, categoryName };
        success(updatedProduct);
    };

    const handleReset = () => {
        setName('');
        setPrice('');
        setInfo('');
        setDetail('');
        setRatingStar('');
        setImageName('');
        setManufacturerName('--Choose Manufacturer--');
        setCategoryName('--Choose Category--');
    };

    const category = categories.map((cate, index) => (
        <option key={index} value={cate.name}>
            {cate.name}
        </option>
    ));
    const manufacturer = manufacturers.map((manu, index) => (
        <option key={index} value={manu.name}>
            {manu.name}
        </option>
    ));

    if (!productUpdate) {
        return <div>Loading...</div>; // Hoặc xử lý tùy thuộc vào trường hợp của bạn
    }

    return (
        <div className={cx('wrap')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-header')}>
                    <p>Update Product</p>
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
                        <label>Price</label>
                        <input
                            type="text"
                            placeholder="Price input..."
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Information</label>
                        <textarea
                            type="text"
                            placeholder="Information..."
                            value={info}
                            onChange={(e) => {
                                setInfo(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Details</label>
                        <textarea
                            type="text"
                            placeholder="Details..."
                            value={detail}
                            onChange={(e) => {
                                setDetail(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Star</label>
                        <input
                            type="number"
                            placeholder="Rating..."
                            value={ratingStar}
                            onChange={(e) => {
                                setRatingStar(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Image</label>
                        <input
                            type="text"
                            value={imageName}
                            onChange={(e) => {
                                setImageName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('field')}>
                        <label>Manufacturer</label>
                        <select
                            value={manufacturerName}
                            onChange={(e) => {
                                setManufacturerName(e.target.value);
                            }}
                        >
                            <option>{manufacturerName}</option>
                            {manufacturer}
                        </select>
                    </div>
                    <div className={cx('field')}>
                        <label>Category</label>
                        <select
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                        >
                            <option>{categoryName}</option>
                            {category}
                        </select>
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
