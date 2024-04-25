import React, { createContext, useState } from 'react';

const FormAddressContext = createContext();

export const FormAddressProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        selectedProvince: '',
        selectedDistrict: '',
        selectedWard: '',
        apartment: '',
        note: '',
    });

    return <FormAddressContext.Provider value={{ formData, setFormData }}>{children}</FormAddressContext.Provider>;
};

export default FormAddressContext;
