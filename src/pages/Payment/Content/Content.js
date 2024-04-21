import classNames from 'classnames/bind';

import styles from './Content.module.scss';
import { Route, Routes } from 'react-router-dom';
import AccuracyPayment from './AccuracyPayment';
import InfoPayment from './InfoPayment';
import withLoading from '~/utils/helpers/withLoading';

const cx = classNames.bind(styles);

function Content() {
    return (
        <div className={cx('wrap')}>
            <Routes>
                <Route path="info-payment" element={<InfoPayment />} />
                <Route path="accurate-payment" element={<AccuracyPayment />} />
            </Routes>
        </div>
    );
}

const ContentWithLoading = withLoading(Content);

export default ContentWithLoading;
