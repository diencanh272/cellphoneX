// SearchAdmin.js
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchAdmin.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function SearchAdmin({ products, accounts, onSearch, onMapping }) {
    const [valueInput, setValueInput] = useState('');
    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setValueInput(inputValue);

        let mapping = false;

        if (products) {
            const filteredProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(inputValue) ||
                    product.categoryName.toLowerCase().includes(inputValue) ||
                    product.manufacturerName.toLowerCase().includes(inputValue),
            );
            mapping = filteredProducts.length === 0;
            // console.log(mapping);
            onSearch(filteredProducts);
        } else if (accounts) {
            const filteredAccounts = accounts.filter(
                (account) =>
                    account.email.toLowerCase().includes(inputValue) ||
                    account.mobile.toLowerCase().includes(inputValue) ||
                    account.username.toLowerCase().includes(inputValue) ||
                    account.fullname.toLowerCase().includes(inputValue),
            );
            mapping = filteredAccounts.length === 0;
            onSearch(filteredAccounts);
        }

        onMapping(mapping);
    };

    const handleXmark = () => {
        setValueInput('');
    };

    return (
        <form className={cx('form-search')}>
            <Button
                className={cx('btn')}
                onMouseDown={handleXmark}
                leftIcon={<FontAwesomeIcon icon={faCircleXmark} />}
            ></Button>
            <input
                className={cx('input')}
                placeholder="Bạn cần tìm gì?"
                value={valueInput}
                onChange={handleInputChange}
            />
        </form>
    );
}

export default SearchAdmin;
