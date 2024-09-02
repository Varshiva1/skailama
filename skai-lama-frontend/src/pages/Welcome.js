import React, { useState } from 'react';
import './Welcome.css';

const WelcomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="welcome-container">
      <div className="left-panel">
        <div className="logo-container">
          {/* <img src="https://magenta-only-clam-144.mypinata.cloud/ipfs/QmegKEUPNLiWDD95DHoPd5MkEntL3UDjuh2hNKgBUaBk3w" />  */}
          <img src="https://magenta-only-clam-144.mypinata.cloud/ipfs/QmNU2DnfPvWohK2tv4tkUJ6UMQ9bVK8VBDiTUHxpLgbVpW" alt="Ques.AI Logo" className="logo" />
        </div>
        <div className="hero-content">
          <h1>Your podcast will no longer be just a hobby.</h1>
          <p>Supercharge Your Distribution using our AI assistant</p>
        </div>
      </div>
      <div className="right-panel">
        <div className="login-container">
          <h2>Welcome to Ques.AI</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          {/* <button className="google-button">
            <img src="/path-to-google-icon.png" alt="Google Icon" />
            Continue with Google
          </button> */}
          <p className="signup-link">
            Don't have an account? <a href="#">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;