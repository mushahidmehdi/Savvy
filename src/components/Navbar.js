import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { check_authentication, logout } from '../appState/actions/auth';
import styles from '../styles/components/navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const isAuthenticated = auth?.isAuthenticated;

  useEffect(() => {
    dispatch(check_authentication());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <div className={styles.navButton}>
          {isAuthenticated ? (
            <button onClick={() => dispatch(logout())}>Logout</button>
          ) : (
            <button onClick={() => navigate('./login', { replace: true })}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
