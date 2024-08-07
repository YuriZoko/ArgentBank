import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPerson } from '@fortawesome/free-solid-svg-icons';
import argentBankLogo from '../img/argentBankLogo.webp';
import '../css/main.css';
import { logout } from '../redux/authSlice';
const Header = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {token && user ? (
          <>
            <span className="main-nav-item">
              <FontAwesomeIcon icon={faPerson} />
              {user.userName}
            </span>
            <a className="main-nav-item" href="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faUserCircle} />
              Sign Out
            </a>
          </>
        ) : (
          <a className="main-nav-item" href="/sign-in">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default Header;