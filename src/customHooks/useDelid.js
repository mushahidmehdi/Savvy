// this is a customer hooks to filter del id realtion
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delAddress } from '../appState/actions/customer';

const useDelid = (addressId) => {
  const [allCustomers, setAllCustomers] = useState([]);
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.customers?.userCustomer?.Id);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getAllCustomers() {
      const body = JSON.stringify({});
      const apiRes = await fetch(
        'http://stage-api.crossborderpickup.com/customer/address/search',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );
      const res = await apiRes.json();
      setAllCustomers(res.Response);
    }
    getAllCustomers();
  }, []);

  allCustomers.map(function (customer) {
    if (customer?.AddressId === addressId) {
      const id = customer?.Id;
      dispatch(delAddress(customerId, id));
    }
  });
};

export default useDelid;
