import { useSelector } from 'react-redux';

import styles from '../styles/components/customerList.module.css';
import UserAddress from './UserAddress';

const UserCustomer = () => {
  const addresses = useSelector((state) => state.customers?.address);
  const customer = useSelector((state) => state?.customers.userCustomer);

  return (
    <section className={styles.UserCustomer}>
      <h1>Customer Detail and Address</h1>
      <div className={styles.container}>
        <div className={styles.flightInfoRow}>
          <p>First Name</p>
          <p>{customer?.FirstName}</p>
        </div>

        <div className={styles.flightInfoRow}>
          <p>Last Name</p>
          <p>{customer?.LastName}</p>
        </div>

        <div className={styles.flightInfoRow}>
          <p>Email</p>
          <p>{customer?.Email}</p>
        </div>

        <div className={styles.flightInfoRow}>
          <p>Phone Number</p>
          <p>{customer?.Phone ? customer?.Phone : '--'}</p>
        </div>
      </div>
      <UserAddress addresses={addresses} />
    </section>
  );
};

export default UserCustomer;
