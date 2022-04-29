import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../appState/actions/customer';
import style from '../styles/components/addcustomer.module.css';

import { cities, provinces, countries } from '../config';
import Dropdown from './Dropdown';

export default function AddCustomer({ modal }) {
  const customer = useSelector((state) => state?.customers.userCustomer);

  const [addAddress, setAddress] = useState(false);
  const dispatch = useDispatch();
  const [cityDropDown, setCityDropDown] = useState(null);
  const [countryDropDown, setCountryDropDown] = useState(null);
  const [proviDropDown, setProviDropDown] = useState(null);
  const [editAddressForm, setEditAddressForm] = useState({
    Title: '',
    AddressLine1: '',
    AddressLine2: '',
  });
  const { Title, AddressLine1, AddressLine2 } = editAddressForm;

  const handleOnChange = (e) => {
    setEditAddressForm({ ...editAddressForm, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      addCustomer(
        {
          Title,
          AddressLine1,
          AddressLine2,
          CountryId: countryDropDown,
          CityId: cityDropDown,
          ProvinceId: proviDropDown,
        },
        customer?.Id
      )
    );
    setAddress(!addAddress);
  };

  if (addAddress) {
    document.body.classList.add('activeModal');
  } else {
    document.body.classList.remove('activeModal');
  }
  return (
    <>
      <div className={style.addAddress}>
        <button onClick={() => setAddress(!addAddress)}>
          Add New Customer
        </button>
      </div>
      {addAddress && (
        <div className={style.modal}>
          <div className={style.overlay} />
          <form className={style.modalContent} onSubmit={submit}>
            <div className={style.formFields}>
              <input
                type="text"
                name="Title"
                id="Title"
                placeholder="Title"
                value={Title}
                onChange={handleOnChange}
              />
            </div>

            <div className={style.formFields}>
              <input
                type="text"
                name="AddressLine1"
                id="AddressLine1"
                placeholder="AdressLineTwo"
                autoComplete="off"
                value={AddressLine1}
                onChange={handleOnChange}
              />
            </div>

            <div className={style.formFields}>
              <input
                type="text"
                name="AddressLine2"
                id="AddressLine2"
                placeholder="AdressLineOne"
                autoComplete="off"
                value={AddressLine2}
                onChange={handleOnChange}
              />
            </div>
            <div className={style.formDropdown}>
              <Dropdown
                data={cities}
                title={'City'}
                setDropDown={setCityDropDown}
              />
              <Dropdown
                data={provinces}
                title={'Provinces/State'}
                setDropDown={setProviDropDown}
              />
            </div>
            <div className={style.formDropdown}>
              <Dropdown
                data={countries}
                title={'Country'}
                setDropDown={setCountryDropDown}
              />
            </div>
            <div className={style.formDropdown}></div>
            <div className={style.formFields} />

            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </>
  );
}
