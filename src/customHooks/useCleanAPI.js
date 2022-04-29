// this is a customer hooks to clean the api for better performance
// to bring together the cutomers and address

import { useEffect, useState } from 'react';

const useCleanAPI = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const customerAddress = {};
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
  allCustomers.map((customer) => {
    if (customer.CustomerId in customerAddress) {
      if (
        !customerAddress[`${customer.CustomerId}`].includes(customer.AddressId)
      )
        customerAddress[`${customer.CustomerId}`].push(customer.AddressId);
    } else {
      customerAddress[`${customer.CustomerId}`] = [customer.AddressId];
    }
  });
  if (customerAddress !== {}) {
    return customerAddress;
  }
};

export default useCleanAPI;
