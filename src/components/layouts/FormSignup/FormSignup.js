import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';

import styles from './FormSignup.module.scss';
import Button from '~/components/common/Button';
import { defaultCreateDate } from '~/utils/helpers/defaultCreateDate';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateNewAccountApi, actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function FormSignup() {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);

    const checkEmailExist = (email) => {
        const check = accounts.find((account) => account.email === email);
        return check ? '' : 'Email đã tồn tại!';
    };

    const checkMobileExist = (mobile) => {
        const check = accounts.find((account) => account.mobile === mobile);
        return check ? '' : 'Số điện thoại đã tồn tại!';
    };

    const checkUsernameExist = (username) => {
        const check = accounts.find((account) => account.username === username);
        return check ? '' : 'Username đã tồn tại!';
    };

    // kiểm tra email, mobile, fullname, username đã tồn tại chưa

    //!! Hàm kiểm tra pattern start
    // const validateEmail = (email) => {
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailPattern.test(email); //true / false
    // };
    // console.log(validateEmail(email));
    //!! Hàm kiểm tra pattern end

    const SignupSchema = Yup.object().shape({
        fullname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[a-zA-Z0-9]+$/, 'No match')
            .required('Required')
            .test('check-email-exist', 'User đã tồn tại ', (value) => checkUsernameExist(value)),

        //1viet hoa, 1 so
        mobile: Yup.string()
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'No match')
            .required('Required')
            .test('check-email-exist', 'Số điện thoại đã tồn tại ', (value) => checkMobileExist(value)),

        //k có kí tự đặc biệt
        email: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .email('Invalid email')
            .required('Required')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ!..Eg:a@gmail.com')
            .test('check-email-exist', 'Email đã tồn tại ', (value) => checkEmailExist(value)),
        password: Yup.string()
            .min(6, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(
                /^(?=.*[A-Z])(?=.*\d).+/,
                'Mật khẩu từ 6-20 kí tự, bao gồm ít nhất 1 chữ hoa,1 chữ thường, 1 chữ số',
            )
            .required('Required'),
        avatarImageName: Yup.string(),
        address: Yup.string().required('Required'),
        createDate: Yup.string().required('Required'),
    });

    return (
        <div className={cx('wrap')}>
            <Formik
                initialValues={{
                    fullname: '',
                    username: '',
                    mobile: '',
                    email: '',
                    password: '',
                    avatarImageName: '',
                    address: '',
                    createDate: defaultCreateDate,
                }}
                validationSchema={SignupSchema}
                onSubmit={(value, { setSubmitting }) => {
                    dispatch(actionCreateNewAccountApi(value))
                        .then((response) => {
                            if (response.error) {
                                console.log(response);
                                setSubmitting(false);
                            } else {
                                console.log(value);
                                localStorage.setItem('Account', JSON.stringify(value));
                                navigate('/');
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className={cx('box-input')}>
                            {errors.fullname && touched.fullname ? <div>{errors.fullname}</div> : null}
                            <Field
                                className={cx('input', 'fullname-input')}
                                type="text"
                                name="fullname"
                                placeholder="Nhập Họ và tên..."
                            />
                            <label className={cx('label')}>Họ và tên (*)</label>
                        </div>
                        <div className={cx('box-input')}>
                            {errors.username && touched.username ? <div>{errors.username}</div> : null}
                            <Field className={cx('input')} type="text" name="username" placeholder="Nhập username..." />
                            <label className={cx('label')}>Nhập username</label>
                        </div>
                        <div className={cx('box-input')}>
                            {errors.mobile && touched.mobile ? <div>{errors.mobile}</div> : null}
                            <Field
                                className={cx('input')}
                                type="text"
                                name="mobile"
                                placeholder="Nhập số điện thoại..."
                                required
                            />
                            <label className={cx('label')}>Nhập số điện thoại (*)</label>
                        </div>
                        <div className={cx('box-input')}>
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <Field className={cx('input')} type="email" name="email" placeholder="Nhập email..." />
                            <label className={cx('label')}>Nhập email (*)</label>
                        </div>
                        <div className={cx('box-input')}>
                            {errors.password && touched.password ? <div>{errors.password}</div> : null}
                            <Field
                                className={cx('input')}
                                type="password"
                                name="password"
                                placeholder="Nhập password..."
                                autoComplete="password"
                            />
                            <label className={cx('label')}>Nhập mật khẩu (*)</label>
                        </div>
                        <div className={cx('box-input')}>
                            {errors.rePassword && touched.rePassword ? <div>{errors.rePassword}</div> : null}
                            <Field
                                className={cx('input')}
                                type="password"
                                name="rePassword"
                                placeholder="Nhập lại password..."
                                autoComplete="re-password"
                            />
                            <label className={cx('label')}>Nhập lại mật khẩu</label>
                        </div>

                        <div className={cx('box-input')}>
                            {errors.avatarImageName && touched.avatarImageName ? (
                                <div>{errors.avatarImageName}</div>
                            ) : null}
                            <Field className={cx('input')} type="file" name="avatarImageName" />
                            <label className={cx('label')}>Chọn avatar</label>
                        </div>
                        <div className={cx('box-input')}>
                            {errors.address && touched.address ? <div>{errors.address}</div> : null}
                            <Field className={cx('input')} type="text" name="address" placeholder="Nhập địa chỉ..." />

                            <label className={cx('label')}>Nhập địa chỉ</label>
                        </div>
                        <div className={cx('box-input')}>
                            {errors.defaultCreateDate && touched.defaultCreateDate ? (
                                <div>{errors.defaultCreateDate}</div>
                            ) : null}
                            <Field className={cx('input')} type="date" name="createDate" disabled />
                            <label className={cx('label')}>Create date</label>
                        </div>

                        <Button className={cx('btn')} type="submit" large primary>
                            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                    </Form>
                )}
            </Formik>
            <div className={cx('question')}>
                <p>Bạn đã có tài khoản?</p>
                <Link to={'/account/login'}>Đăng nhập ngay</Link>
            </div>
        </div>
    );
}

export default FormSignup;
