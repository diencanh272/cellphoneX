import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './FormCreateProduct.module.scss';
import Button from '~/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListCategoryApi } from '~/actions/CategoryAction';
import { actionFetchListManufacturerApi } from '~/actions/ManufacturerAction';
import { actionCreateProductApi, actionFetchListProductApi } from '~/actions/ProductAction';

const cx = classNames.bind(styles);

function FormCreateProduct() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const manufacturers = useSelector((state) => state.manufacturers);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
        dispatch(actionFetchListCategoryApi());
        dispatch(actionFetchListManufacturerApi());
    }, [dispatch]);

    // const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [info, setInfo] = useState('');
    const [detail, setDetail] = useState('');
    const [ratingStar, setRatingStar] = useState('');
    const [imageName, setImageName] = useState(null);
    const [manufacturerId, setManufacturerId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    //Handle input file

    const handlePathImage = (e) => {
        const file = e.target.files[0].name;
        // console.log(file);
        setImageName(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
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

        dispatch(actionCreateProductApi(newProduct));
        // console.log(newProduct);
        handleReset();
    };

    const handleReset = () => {
        setName('');
        setPrice('');
        setInfo('');
        setDetail('');
        setRatingStar('');
        setImageName(null);
        setManufacturerId('');
        setCategoryId('');
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
                    <p>Create New Product</p>
                </div>
                <div className={cx('form-input')}>
                    <div className={cx('field')}>
                        <label>ID</label>
                        <input type="text" placeholder="ID input" disabled />
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
                            value={manufacturerId}
                            onChange={(e) => {
                                setManufacturerId(e.target.value);
                            }}
                        >
                            <option>--Choose Manufacturer--</option>
                            {manufacturer}
                        </select>
                    </div>
                    <div className={cx('field')}>
                        <label>Category</label>
                        <select
                            value={categoryId}
                            onChange={(e) => {
                                setCategoryId(e.target.value);
                            }}
                        >
                            <option>--Choose Category--</option>
                            {category}
                        </select>
                    </div>
                </div>
                <div className={cx('form-footer')}>
                    <Button primary type="submit">
                        Save
                    </Button>
                    <Button primary type="reset">
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default FormCreateProduct;
