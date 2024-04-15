import React from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function Search() {
    return (
        <form>
            <Button className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}></Button>
            <input className={cx('input')} placeholder="Bạn cần tìm gì?" />
            {/* <Button className={cx('clear-btn')}>
                <FontAwesomeIcon icon={faCircleXmark} />
                <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
            </Button> */}
        </form>
    );
}

export default Search;
