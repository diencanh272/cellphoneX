import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function Pagination({ productPerPage, paginate, totalProduct, currentPage }) {
    // console.log(productPerPage, paginate, totalProduct);

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
        pageNumber.push(i);
    }

    const renderPageNumber = pageNumber.map((page) => (
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
        <tr className={cx('wrap')}>
            <td>{renderPageNumber}</td>
        </tr>
    );
}

export default Pagination;
