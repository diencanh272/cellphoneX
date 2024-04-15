import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './FormUpdateProduct.module.scss';
import Button from '~/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import { actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';
import { actionFetchListProductApi, actionUpdateProductApi } from '~/actions/ProductAction';

const cx = classNames.bind(styles);

function FormUpdateProduct({ productUpdate }) {
    const productInput = productUpdate.productUpdate;
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const manufacturers = useSelector((state) => state.manufacturers);

    useEffect(() => {
        dispatch(actionFetchListCategoryApi());
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);

    // const [productId, setProductId] = useState('');
    const [name, setName] = useState(productInput.name);
    const [price, setPrice] = useState(productInput.price);
    const [info, setInfo] = useState(productInput.info);
    const [detail, setDetail] = useState(productInput.detail);
    const [ratingStar, setRatingStar] = useState(productInput.ratingStar);
    const [imageName, setImageName] = useState(productInput.imageName);
    const [manufacturerId, setManufacturerId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    //Handle input file
    const handlePathImage = (e) => {
        const file = e.target.files[0].name;
        setImageName(file);
    };

    // console.log(productInput);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProduct = {
            // id: 1,
            name,
            price,
            info,
            detail,
            ratingStar,
            imageName,
            manufacturerId,
            categoryId,
        };

        dispatch(actionUpdateProductApi(productInput.id, updatedProduct));
        dispatch(actionFetchListProductApi());
        // console.log(updatedProduct);
    };

    const handleReset = () => {
        setName('');
        setPrice('');
        setInfo('');
        setDetail('');
        setRatingStar('');
        setImageName(null);
        setManufacturerId('--Choose Manufacturer--');
        setCategoryId('--Choose Category--');
    };

    const category = categories.map((cate, index) => (
        <option key={index} value={cate.id}>
            {cate.name}
        </option>
    ));
    const manufacturer = manufacturers.map((manu, index) => (
        <option key={index} value={manu.id}>
            {manu.name}
        </option>
    ));

    return (
        <div className={cx('wrap')}>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-header')}>
                    <p>Update Product</p>
                </div>
                <div className={cx('form-input')}>
                    <div className={cx('field')}>
                        <label>ID</label>
                        <input type="text" placeholder="ID input" disabled value={productInput.id} />
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
                        <input type="file" onChange={handlePathImage} />
                    </div>
                    <div className={cx('field')}>
                        <label>Manufacturer</label>
                        <select
                            onChange={(e) => {
                                setManufacturerId(e.target.value);
                            }}
                        >
                            <option>{manufacturerId}</option>
                            {manufacturer}
                        </select>
                    </div>
                    <div className={cx('field')}>
                        <label>Category</label>
                        <select
                            onChange={(e) => {
                                setCategoryId(e.target.value);
                            }}
                        >
                            <option>{categoryId}</option>
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
