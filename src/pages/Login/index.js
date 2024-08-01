import React, { useState, useEffect } from 'react';
import '../../css/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { login, fetchUserProfile } from '../../redux/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: username, password }))
      .then((resultAction) => {
        if (login.fulfilled.match(resultAction)) {
          dispatch(fetchUserProfile())
            .then((profileResult) => {
              if (fetchUserProfile.fulfilled.match(profileResult)) {
                navigate('/user'); 
              }
            })
            .catch((profileError) => {
              console.error("Profile fetch failed:", profileError);
            });
        } else {
          console.log("Login failed:", resultAction.payload);
        }
      })
      .catch((loginError) => {
        console.error("Login error:", loginError);
      });
  };
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/user');
    }
  }, [status, navigate]);

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {status === 'failed' && <p className="error">{error}</p>}
            <button type="submit" className="sign-in-button" disabled={status === 'loading'}>
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;