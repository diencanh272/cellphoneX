import classNames from 'classnames/bind';

import styles from './UserLogin.module.scss';
import Button from '~/components/common/Button';
import { Tooltip } from 'antd';
import ShortNameUser from '~/utils/helpers/shortNameUser';
import TooltipModal from '~/components/common/TooltipModal';

const cx = classNames.bind(styles);

function UserLogin({ userCurrentSignup }) {
    // console.log(userCurrentSignup);
    const GetUserName = () => {
        setTimeout(() => {
            return userCurrentSignup.username;
        }, 1000);
    };

    return (
        <Tooltip placement="bottomRight" title={<TooltipModal />} color="#fff">
            <Button className={cx('wrap')} leftIcon={<ShortNameUser />}>
                <GetUserName />
            </Button>
        </Tooltip>
    );
}

export default UserLogin;
