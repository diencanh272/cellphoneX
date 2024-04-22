import { findLevel1ById, findLevel1ByName, level1s } from 'dvhcvn';
import classNames from 'classnames/bind';

import styles from './FormAddress.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FormAddress() {
    // console.log(level1s);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    // Lấy danh sách các tỉnh/thành phố từ dữ liệu level1s
    const provinces = level1s.map((lv1) => findLevel1ById(lv1.id));
    let districts = [];
    let wards = [];
    // console.log(provinces);

    //! Provinces start
    const handleProvinceChange = (event) => {
        const selectedProvinceName = event.target.value;
        setSelectedProvince(selectedProvinceName);
        // console.log(selectedProvinceName);
    };
    //! Provinces end

    //! Districts start
    const handleDistrictChange = (event) => {
        const selectedDistrictName = event.target.value;
        setSelectedDistrict(selectedDistrictName);
        // console.log(selectedProvinceName);
    };

    // Tìm lại tỉnh đã được chọn
    const provinceSelected = findLevel1ByName(selectedProvince);
    // console.log(provinceSelected);
    if (provinceSelected) {
        districts = provinceSelected.children;
    }

    //! Districts end

    //! Wards start
    const handleWardChange = (event) => {
        const selectedWardName = event.target.value;
        setSelectedWard(selectedWardName);
        // console.log(selectedProvinceName);
    };
    // Tìm lại huyện đã được chọn
    const districtSelected = provinceSelected?.findLevel2ByName(`${selectedDistrict}`);
    // console.log(districtSelected);
    if (districtSelected) {
        wards = districtSelected.children;
    }
    //! Wards end

    //! Render

    // console.log(provinces);
    const renderProvinces = provinces.map((province) => (
        <option key={province.id} value={province.name}>
            {province.name}
        </option>
    ));

    // console.log(districts);
    const renderDistricts = districts.map((district) => (
        <option key={district.id} value={district.name}>
            {district.name}
        </option>
    ));
    // console.log(wards);
    const renderWards = wards.map((ward) => (
        <option key={ward.id} value={ward.name}>
            {ward.name}
        </option>
    ));

    return (
        <div className={cx('wrap')}>
            <div className={cx('box-input-wrap')}>
                <div className={cx('box-input')}>
                    <select className={cx('input')} onChange={handleProvinceChange}>
                        <option value="">--Chọn Tỉnh / Thành phố-- </option>
                        {renderProvinces}
                    </select>
                    <label className={cx('title')}>Tỉnh / Thành phố</label>
                </div>
                <div className={cx('box-input')}>
                    <select className={cx('input')} onChange={handleDistrictChange}>
                        <option value="">--Chọn Quận / Huyện-- </option>
                        {renderDistricts}
                    </select>

                    <label className={cx('title')}>Quận / Huyện</label>
                </div>
            </div>
            <div className={cx('box-input-wrap')}>
                <div className={cx('box-input')}>
                    <select className={cx('input')} onChange={handleWardChange}>
                        <option value="">--Chọn Phường / Xã-- </option>
                        {renderWards}
                    </select>

                    <label className={cx('title')}>Phường / Xã</label>
                </div>
                <div className={cx('box-input')}>
                    <input className={cx('input')} type="text" placeholder="Số nhà , tên đường" />
                    <label className={cx('title')}>Địa chỉ</label>
                </div>
            </div>
            <div className={cx('box-input-wrap')}>
                <div className={cx('box-input')}>
                    <input className={cx('input')} type="text" placeholder="Ghi chú khác (nếu có)" />
                    <label className={cx('title')}>Ghi chú</label>
                </div>
            </div>
        </div>
    );
}

export default FormAddress;
