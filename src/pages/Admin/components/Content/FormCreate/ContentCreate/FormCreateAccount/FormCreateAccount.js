import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';

import styles from './FormCreateAccount.module.scss';
import Button from '~/components/common/Button';
import { defaultCreateDate } from '~/utils/helpers/defaultCreateDate';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateNewAccountApi, actionFetchListAccountApi } from '~/actions/AccountAction';

const cx = classNames.bind(styles);

function FormCreateAccount() {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);

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
        fullname: Yup.string().min(2, 'Tên của bạn quá ngắn!').max(50, 'Tên của bạn quá dài!').required('Bắt buộc'),
        username: Yup.string()
            .min(2, 'Tên tài khoản quá ngắn!')
            .max(20, 'Tên tài khoản quá dài!')
            .matches(/^[a-zA-Z0-9]+$/, 'Tên là kí tự a-z,A-Z,0-9')
            .required('Bắt buộc!')
            .test('check-email-exist', 'Tên tài khoản đã tồn tại ', (value) => checkUsernameExist(value)),

        //1viet hoa, 1 so
        mobile: Yup.string()
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Kiểm tra lại số điện thoại')
            .required('Bắt buộc!')
            .test('check-email-exist', 'Số điện thoại đã đăng kí ', (value) => checkMobileExist(value)),

        //k có kí tự đặc biệt
        email: Yup.string()
            .min(2, 'Email quá ngắn!')
            .max(50, 'Email quá dài!')
            .email('Email không hợp lệ!')
            .required('Bắt buộc!')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ!..Eg:a@gmail.com')
            .test('check-email-exist', 'Email đã tồn tại ', (value) => checkEmailExist(value)),
        password: Yup.string()
            .min(6, 'Mật khẩu quá ngắn!')
            .max(20, 'Mật khẩu quá dài!')
            .matches(
                /^(?=.*[A-Z])(?=.*\d).+/,
                'Mật khẩu từ 6-20 kí tự, bao gồm ít nhất 1 chữ hoa,1 chữ thường, 1 chữ số',
            )
            .required('Bắt buộc!'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu nhập lại phải khớp với mật khẩu')
            .required('Bắt buộc!'),
        avatarImageName: Yup.string(),
        address: Yup.string().required('Bắt buộc!'),
        createDate: Yup.string().required('Bắt buộc!'),
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
                    rePassword: '',
                    avatarImageName: '',
                    address: '',
                    createDate: defaultCreateDate,
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => {
                    const { rePassword, ...formData } = values;
                    dispatch(actionCreateNewAccountApi(formData));
                    resetForm();
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className={cx('form-group')}>
                            {errors.fullname && touched.fullname ? (
                                <div className={cx('error')}>{errors.fullname}</div>
                            ) : null}
                            <label className={cx('label')}>Họ và tên (*)</label>
                            <Field
                                className={cx('input', 'fullname-input')}
                                type="text"
                                name="fullname"
                                placeholder="Nhập Họ và tên..."
                            />
                        </div>
                        <div className={cx('form-group')}>
                            {errors.username && touched.username ? (
                                <div className={cx('error')}>{errors.username}</div>
                            ) : null}
                            <label className={cx('label')}>Nhập username</label>
                            <Field className={cx('input')} type="text" name="username" placeholder="Nhập username..." />
                        </div>
                        <div className={cx('form-group')}>
                            {errors.mobile && touched.mobile ? (
                                <div className={cx('error')}>{errors.mobile}</div>
                            ) : null}
                            <label className={cx('label')}>Nhập số điện thoại (*)</label>
                            <Field
                                className={cx('input')}
                                type="text"
                                name="mobile"
                                placeholder="Nhập số điện thoại..."
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            {errors.email && touched.email ? <div className={cx('error')}>{errors.email}</div> : null}
                            <label className={cx('label')}>Nhập email (*)</label>
                            <Field className={cx('input')} type="email" name="email" placeholder="Nhập email..." />
                        </div>
                        <div className={cx('form-group')}>
                            {errors.password && touched.password ? (
                                <div className={cx('error')}>{errors.password}</div>
                            ) : null}
                            <label className={cx('label')}>Nhập mật khẩu (*)</label>
                            <Field
                                className={cx('input')}
                                type="password"
                                name="password"
                                placeholder="Nhập password..."
                                autoComplete="password"
                            />
                        </div>
                        <div className={cx('form-group')}>
                            {errors.rePassword && touched.rePassword ? (
                                <div className={cx('error')}>{errors.rePassword}</div>
                            ) : null}
                            <label className={cx('label')}>Nhập lại mật khẩu</label>
                            <Field
                                className={cx('input')}
                                type="password"
                                name="rePassword"
                                placeholder="Nhập lại password..."
                                autoComplete="re-password"
                            />
                        </div>

                        <div className={cx('form-group')}>
                            {errors.avatarImageName && touched.avatarImageName ? (
                                <div className={cx('error')}>{errors.avatarImageName}</div>
                            ) : null}
                            <label className={cx('label')}>Chọn avatar</label>
                            <Field className={cx('input')} type="file" name="avatarImageName" />
                        </div>
                        <div className={cx('form-group')}>
                            {errors.address && touched.address ? (
                                <div className={cx('error')}>{errors.address}</div>
                            ) : null}
                            <label className={cx('label')}>Nhập địa chỉ</label>
                            <Field className={cx('input')} type="text" name="address" placeholder="Nhập địa chỉ..." />
                        </div>
                        <div className={cx('form-group')}>
                            {errors.defaultCreateDate && touched.defaultCreateDate ? (
                                <div className={cx('error')}>{errors.defaultCreateDate}</div>
                            ) : null}
                            <label className={cx('label')}>Create date</label>
                            <Field className={cx('input')} type="date" name="createDate" disabled />
                        </div>

                        <div className={cx('action')}>
                            <Button className={cx('btn')} type="submit" primary>
                                Đăng kí
                            </Button>
                            <Button className={cx('btn')} type="submit" primary>
                                Reset
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormCreateAccount;
