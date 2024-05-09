import React from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function Pagination({ productPerPage, paginate, totalProduct, currentPage }) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
        pageNumber.push(i);
    }

    // Tính toán các trang cần hiển thị trên thanh phân trang
    let startPage = Math.max(1, currentPage - 2); //(1,5-2)
    let endPage = Math.min(currentPage + 2, Math.ceil(totalProduct / productPerPage)); //(7,)

    // Nếu vẫn còn trang phía trước, thêm nút "Prev"
    const prevButton = currentPage > 1 && (
        <Button text rounded onClick={() => paginate(currentPage - 1)}>
            Prev
        </Button>
    );

    // Nếu vẫn còn trang phía sau, thêm nút "Next"
    const nextButton = currentPage < Math.ceil(totalProduct / productPerPage) && (
        <Button text rounded onClick={() => paginate(currentPage + 1)}>
            Next
        </Button>
    );

    // Rendner các nút trang
    const renderPageNumber = pageNumber.slice(startPage - 1, endPage).map((page) => (
        <Button
            text
            rounded
            key={page}
            onClick={() => paginate(page)}
            className={cx(`${currentPage === page ? 'active' : ''}`)}
        >
            {page}
        </Button>
    ));

    return (
        <div className={cx('pagination')}>
            {prevButton}
            {renderPageNumber}
            {nextButton}
        </div>
    );
}

export default Pagination;
