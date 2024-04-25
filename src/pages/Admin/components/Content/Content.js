import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Content.module.scss';

import DashboardAdmin from './DashboardAdmin';
import AccountAdmin from './AccountAdmin';
import ManufacturerAdmin from './ManufacturerAdmin';
import CategoryAdmin from './CategoryAdmin';
import ProductsAdmin from './ProductsAdmin';
import FormCreate from './FormCreate';
import withLoading from '~/utils/helpers/withLoading';

const cx = classNames.bind(styles);

function Content() {
    return (
        <div className={cx('wrap')}>
            <Routes>
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="accounts" element={<AccountAdmin />} />
                <Route path="manufacturer" element={<ManufacturerAdmin />} />
                <Route path="category" element={<CategoryAdmin />} />
                <Route path="product" element={<ProductsAdmin />} />
                <Route path="create/*" element={<FormCreate />} />
            </Routes>
        </div>
    );
}

const ContentWithLoading = withLoading(Content);

export default ContentWithLoading;
