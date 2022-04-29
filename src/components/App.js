import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './Login';
import Navbar from './Navbar';

import UserProfile from './UserProfile';
import { fetch_all_customer, customer_id } from '../appState/actions/customer';

function App() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_all_customer());
    dispatch(customer_id());
  }, []);

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
