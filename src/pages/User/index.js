import React, { useEffect } from 'react';
import '../../css/main.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />Tony Jarvis!</h1>
          <button className="edit-button">Edit Name</button>
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