import { useEffect, useState } from 'react';
import useCleanAPI from '../customHooks/useCleanAPI';
import useDelid from '../customHooks/useDelid';
import { useDispatch, useSelector } from 'react-redux';
import { userAddress } from '../appState/actions/customer';
import style from '../styles/components/userAddress.module.css';
import Modal from './Modal';

const UserAddress = ({ addresses }) => {
  const [modal, setModal] = useState(false);
  const [delAddressId, setDelAddressId] = useState(null);
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();
  const clean = useCleanAPI();
  const delRaltionId = useDelid(delAddressId);
  const customerId = useSelector((state) => state.customers?.userCustomer?.Id);
  const addressIdsList = clean[customerId];

  useEffect(() => {
    dispatch(userAddress(addressIdsList));
  }, [customerId]);

  return (
    <>
      {addresses?.map(({ Response }, index) => (
        <div className={style.address} key={index}>
          <div className={style.container}>
            <div className={style.addressLabel}>
              <label>{index + 1}.</label>
            </div>
            <div className={style.addressLabel}>
              <label>Title</label>
              <p>{Response?.Title}</p>
            </div>
            <div className={style.addressLabel}>
              <label>Address:</label>
              <p>
                {Response?.AddressLine1} {Response?.AddressLine2}
              </p>
            </div>

            <div className={style.addressLabel}>
              <label>City:</label>
              <p>{Response?.City?.Name}</p>
            </div>
            <div className={style.addressLabel}>
              <label>Province:</label>
              <p>{Response?.Province?.Name} </p>
            </div>
            <div className={style.addressLabel}>
              <label>Country:</label>
              <p>{Response?.Country?.Name}</p>
            </div>
            <div className={style.addressLabelBtn}>
              <button onClick={() => [setResponse(Response), setModal(!modal)]}>
                Edit
              </button>
              <button onClick={() => setDelAddressId(Response?.Id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <Modal setModal={setModal} modal={modal} response={response} />
    </>
  );
};

export default UserAddress;
