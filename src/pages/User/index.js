import React, { useState, useEffect } from 'react';
import '../../css/main.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../redux/authSlice';

const User = () => {
  const dispatch = useDispatch();
  const { user, token, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.userName || '');

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
    }
  }, [user]);
  
  if (!token) {
    return null;
  }

  const handleSaveClick = () => {
    dispatch(updateUserProfile({ token, username }))
      .then(() => {
        setEditing(false);
      })
      .catch((err) => {
        console.error('An error occurred while updating the profile:', err);
      });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setUsername(user?.userName || '');
  };

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user?.firstName} {user?.lastName}!
          </h1>
          {editing ? (
            <div className="edit-form-container">
              <div className="edit-form">
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
                  <label htmlFor="firstName">FirstName</label>
                  <input type="text" id="firstName" value={user?.firstName} readOnly />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName">LastName</label>
                  <input type="text" id="lastName" value={user?.lastName} readOnly />
                </div>
                <div className="button-group">
                  <button className="edit-button" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button className="edit-button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
      </main>
      <Footer />
    </div>
  );
};

const Account = ({ title, amount, description }) => (
  <section className="account">
    <div className="account-content-wrapper">
      <h3 className="account-title">{title}</h3>
      <p className="account-amount">{amount}</p>
      <p className="account-amount-description">{description}</p>
    </div>
    <div className="account-content-wrapper cta">
      <button className="transaction-button">View transactions</button>
    </div>
  </section>
);

export default User;