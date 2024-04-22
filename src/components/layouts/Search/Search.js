import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListProductApi } from '~/actions/ProductAction';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [showResult, setShowResult] = useState(false);
    const [xmark, setXmark] = useState(false);
    const [valueInput, setValueInput] = useState('');

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    // console.log(products);

    useEffect(() => {
        dispatch(actionFetchListProductApi());
    }, [dispatch]);

    //! Handle Search Start
    let getNameProducts = [];
    products.map((prd) => {
        return getNameProducts.push(prd.name);
    });
    let lowCaseGetNameProduct = [];
    getNameProducts.map((name) => lowCaseGetNameProduct.push(name.toLowerCase()));
    const lowerCaseInput = valueInput.toLowerCase();
    // console.log(lowerCaseInput);
    // console.log(lowCaseGetNameProduct);
    const inputMapResult = [];
    for (let i = 0; i < lowCaseGetNameProduct.length; i++) {
        if (lowCaseGetNameProduct[i].includes(lowerCaseInput)) {
            inputMapResult.push(lowCaseGetNameProduct[i]);
        }
    }
    const handleOnClickLink = () => {
        setShowResult(false);
    };
    const resultFormSearch = inputMapResult.map((result, index) => {
        return (
            <li key={index} className={cx('result-item')}>
                <Link onClick={handleOnClickLink} to={`/detail/${result}`}>
                    {result}
                </Link>
            </li>
        );
    });
    //! Handle Search End

    const handleXmark = () => {
        valueInput !== '' ? setValueInput('') : setShowResult(false);
    };

    return (
        <form className={cx('form-search')}>
            {xmark ? (
                <Button
                    className={cx('btn')}
                    onMouseDown={handleXmark}
                    leftIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                ></Button>
            ) : (
                ''
            )}
            <input
                className={cx('input')}
                placeholder="Bạn cần tìm gì?"
                value={valueInput}
                onChange={(e) => {
                    setValueInput(e.target.value);
                }}
                onFocus={() => {
                    setShowResult(true);
                    setXmark(true);
                }}
            />
            {showResult && (
                <div className={cx('result-wrap')}>
                    <ul className={cx('result-list')}> {resultFormSearch}</ul>
                </div>
            )}
            {/* <Button className={cx('clear-btn')}> */}
            {/* <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} /> */}
            {/* </Button> */}
        </form>
    );
}

export default Search;
