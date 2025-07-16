// src/pages/Login.tsx
import React from 'react';
import './Login.css';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import googleLogo from '../assets/google-logo.png';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // ✅ Redirect to home on successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>👋 Welcome Back!</h1>
        <p>Sign in to start tracking your interview prep journey</p>
        <button className="google-btn" onClick={handleLogin}>
          <img src={googleLogo} alt="Google" className="google-icon" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
