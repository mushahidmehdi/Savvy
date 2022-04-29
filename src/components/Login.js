import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../styles/components/Loginform.module.css';
import { login } from '../appState/actions/auth';

const Login = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const [loginAccount, setLoginAccount] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginAccount;

  const handleOnChange = (e) => {
    setLoginAccount({ ...loginAccount, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setLoginAccount({ email: '', password: '' });
  };

  if (isAuthenticated) {
    nagivate('/');
  }

  return (
    <>
      <section className={styles.form}>
        <div className={styles.container}>
          <h1>Plese Enter User Credentials Information</h1>
          <form onSubmit={submit}>
            <div className={styles.formFields}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleOnChange}
                autoComplete="on"
                aria-describedby="reqEmailFields"
                required
              />
            </div>

            <div className={styles.formFields}>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={handleOnChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
