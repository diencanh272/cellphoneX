import React from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function Pagination({ productPerPage, paginate, totalProduct, currentPage }) {
    const totalPages = Math.ceil(totalProduct / productPerPage);
    // const totalPages = 100;
    const pageNumber = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumber.push(i);
    }

    //logic hiển thị 5 trang
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 1);
    }

    // Nút "Prev"
    const prevButton = currentPage > 1 && (
        <Button text rounded onClick={() => paginate(currentPage - 1)}>
            Prev
        </Button>
    );

    // Nút "Next"
    const nextButton = currentPage < totalPages && (
        <Button text rounded onClick={() => paginate(currentPage + 1)}>
            Next
        </Button>
    );

    // Render các nút trang
    const renderPageNumber = pageNumber.slice(startPage - 1, endPage).map((page) => (
        <Button text rounded key={page} onClick={() => paginate(page)} className={cx({ active: currentPage === page })}>
            {page}
        </Button>
    ));

    // Thêm nút trang đầu và trang cuối nếu cần
    const firstPageButton = startPage > 1 && (
        <>
            <Button text rounded key={1} onClick={() => paginate(1)} className={cx({ active: currentPage === 1 })}>
                1
            </Button>
            {startPage > 2 && <span style={{ margin: ' 0 10px' }}>...</span>}
        </>
    );

    const lastPageButton = endPage < totalPages && (
        <>
            {endPage < totalPages - 1 && <span style={{ margin: ' 0 10px' }}>...</span>}
            <Button
                text
                rounded
                key={totalPages}
                onClick={() => paginate(totalPages)}
                className={cx({ active: currentPage === totalPages })}
            >
                {totalPages}
            </Button>
        </>
    );

    return (
        <div className={cx('pagination')}>
            {prevButton}
            {firstPageButton}
            {renderPageNumber}
            {lastPageButton}
            {nextButton}
        </div>
    );
}

export default Pagination;
