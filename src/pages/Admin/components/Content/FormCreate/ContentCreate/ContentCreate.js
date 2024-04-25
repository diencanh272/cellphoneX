import classNames from 'classnames/bind';

import styles from './ContentCreate.module.scss';
import { Route, Routes } from 'react-router-dom';
import FormCreateProduct from './FormCreateProduct';
import FormSignup from '~/components/layouts/FormSignup';
import FormCreateCategory from './FormCreateCategory';
import FormCreateManu from './FormCreateManu';

const cx = classNames.bind(styles);

function ContentCreate() {
    const FormCreateNew = ({ title, component }) => (
        <>
            <p className={cx('title')}>{title}</p>
            {component}
        </>
    );

    return (
        <div className={cx('wrap')}>
            <Routes>
                <Route path="product" element={<FormCreateProduct />} />
                <Route
                    path="account"
                    element={<FormCreateNew title={'Create New Account'} component={<FormSignup />} />}
                />
                <Route
                    path="category"
                    element={<FormCreateNew title={'Create New Category'} component={<FormCreateCategory />} />}
                />
                <Route
                    path="manufacturer"
                    element={<FormCreateNew title={'Create New Manufacturer'} component={<FormCreateManu />} />}
                />
            </Routes>
        </div>
    );
}

export default ContentCreate;
