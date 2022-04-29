import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { User } from 'react-feather';
import moment from 'moment';

import UserCustomer from './UserCustomer';
import AddCustomer from './AddCustomer';

import { updateUser } from '../appState/actions/auth';
import styles from '../styles/components/userProfile.module.css';
import Navbar from './Navbar';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);

  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const [userDataForm, setUserDataForm] = useState({
    Id: '',
    Username: '',
    FirstName: '',
    LastName: '',
    Email: '',
  });
  const { Id, Username, FirstName, LastName, Email, Phone } = userDataForm;
  const month = moment(user?.CreationTime?.slice(5, 7).toString(), 'MM').format(
    'MMMM'
  );

  const handleOnChange = (e) => {
    setUserDataForm({ ...userDataForm, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ Id, Username, FirstName, LastName, Email }));
    setEditProfile(!editProfile);
    setUserDataForm({
      Id: user?.Id,
      Username: user?.Username,
      FirstName: user?.FirstName,
      LastName: user?.LastName,
      Email: user?.Email,
    });
  };

  useEffect(() => {
    if (user !== null) {
      setUserDataForm({
        Id: user?.Id,
        Username: user?.Username,
        FirstName: user?.FirstName,
        LastName: user?.LastName,
        Email: user?.Email,
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    navigate('./login', { replace: true });
  }

  return (
    <>
      <Navbar />
      {!editProfile ? (
        <section className={styles.UserCustomer}>
          <div className={styles.container}>
            <div className={styles.userAvatar}>
              <User size={88} strokeWidth={0.9} />
              <p>@{user?.Username}</p>
            </div>
            <div className={styles.userProfileName}>
              <p>
                {user?.FirstName} {user?.LastName}
              </p>
            </div>

            <div className={styles.userInfoRow}>
              <p>
                Join on {month} {user?.CreationTime?.slice(0, 4)}
              </p>
            </div>
            <div className={styles.userInfoRow}>
              <button onClick={() => setEditProfile(!editProfile)}>
                Edit Profile
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.UserCustomer}>
          <div className={styles.container}>
            <div className={styles.userAvatar}>
              <User size={88} strokeWidth={0.9} />
            </div>
            <form onSubmit={submit}>
              <div className={styles.userinput}>
                <label htmlFor="Username">Username</label>
                <input
                  type="text"
                  className={styles.effect}
                  name="Username"
                  id="Username"
                  placeholder="Username"
                  value={Username}
                  onChange={handleOnChange}
                  autoComplete="off"
                />
                <span className={styles.focusBorder}></span>
              </div>
              <div className={styles.userinput}>
                <label htmlFor="">FirstName</label>
                <input
                  type="text"
                  className={styles.effect}
                  name="FirstName"
                  id="FirstName"
                  placeholder="First Name"
                  value={FirstName}
                  onChange={handleOnChange}
                  autoComplete="off"
                />
                <span className={styles.focusBorder}></span>
              </div>

              <div className={styles.userinput}>
                <label htmlFor="LastName">Last Name</label>
                <input
                  type="text"
                  className={styles.effect}
                  name="LastName"
                  id="LastName"
                  placeholder="Last Name"
                  value={LastName}
                  onChange={handleOnChange}
                  autoComplete="off"
                />
                <span className={styles.focusBorder}></span>
              </div>

              <div className={styles.userinput}>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className={styles.effect}
                  name="Email"
                  id="Email"
                  placeholder="Email"
                  value={Email}
                  onChange={handleOnChange}
                  autoComplete="off"
                />
                <span className={styles.focusBorder}></span>
              </div>

              <div className={styles.userInfoRow}>
                <button type="submit">Update Profile</button>
              </div>
            </form>
          </div>
        </section>
      )}
      <AddCustomer />
      <UserCustomer />
    </>
  );
};

export default UserProfile;
