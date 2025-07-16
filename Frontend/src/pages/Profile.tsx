import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updateEmail } from 'firebase/auth';

const Profile: React.FC = () => {
  const auth = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(auth?.user?.displayName || '');
  const [email, setEmail] = useState(auth?.user?.email || '');
  const [emailError, setEmailError] = useState('');

  if (!auth || !auth.user) return <p>Loading...</p>;
  const { user } = auth;

  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = async () => {
  if (!isEmailValid(email)) {
    setEmailError('Please enter a valid email address.');
    return;
  }

  try {
    if (displayName !== user.displayName) {
      await updateProfile(user, { displayName });
    }

    if (email !== user.email) {
      await updateEmail(user, email);
    }

    alert('Profile updated successfully!');
    setEditMode(false);
    setEmailError('');
  } catch (error: any) {
    console.error('Update failed:', error);

    if (error.code === 'auth/requires-recent-login') {
      alert('For security reasons, please log out and log back in to update your email.');
    } else {
      alert('Failed to update profile. Please try again.');
    }
  }
};


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(isEmailValid(value) ? '' : 'Please enter a valid email address.');
  };

  return (
    <div className="profile-container">
      <h2>👤 Profile Settings</h2>

      <div className="profile-box">
        <div className="profile-field">
          <label>Display Name:</label>
          {editMode ? (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          ) : (
            <p>{displayName || 'Not set'}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Email:</label>
          {editMode ? (
            <>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="error-text">{emailError}</p>}
            </>
          ) : (
            <p>{email}</p>
          )}
        </div>

        {editMode ? (
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={!!emailError}
          >
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
