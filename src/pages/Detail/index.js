import classNames from 'classnames/bind';

import styles from './Detail.module.scss';
import StarRating from '~/utils/helpers/StarRating/StarRating';
import images from '~/assets/images';
import Button from '~/components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Detail() {
    return (
        <div className={cx('container')}>
            <div className={cx('row', 'top')}>
                <h3>Name Product</h3>
                <StarRating />
            </div>

            <hr />

            <div className={cx('row')}>
                <div className={cx('col-5', 'image-wrap')}>
                    <img src={images.product} alt="" />
                </div>
                <div className={cx('offset-1', 'col-5', 'info')}>
                    <div className={cx('feature')}>
                        <ul>
                            <li>
                                Lorem ipsum dolor sit, consectetur . esse quos laboriosam , iste libero quidem est .
                            </li>
                            <li>
                                Lorem ipsum dolor sit, consectetur . esse quos laboriosam , iste libero quidem est .
                            </li>
                            <li>
                                Lorem ipsum dolor sit, consectetur . esse quos laboriosam , iste libero quidem est .
                            </li>
                            <li>
                                Lorem ipsum dolor sit, consectetur . esse quos laboriosam , iste libero quidem est .
                            </li>
                        </ul>
                    </div>

                    <div className={cx('row', 'action')}>
                        <div className={cx('col-8')}>
                            <Button to={'/cart'} primary className={cx('buy')}>
                                MUA NGAY
                                <p>(Giao nhanh từ 2 giờ hoặc nhận tại của hàng)</p>
                            </Button>
                        </div>
                        <div className={cx('col-4')}>
                            <Button
                                rounded
                                className={cx('add-to-cart')}
                                leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
                            >
                                Thêm vào giỏ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
