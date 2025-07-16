import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import AddTopic from './pages/AddTopic';
import Favorites from './pages/Favorites';
import Stats from './pages/Stats';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import CompanyQuestions from './pages/CompanyQuestions';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';
import { Topic } from './types/Topic';

const App: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Firebase Auth listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch topics based on userId
  const fetchTopics = async () => {
    if (!user) return;

    try {
      const res = await axios.get<Topic[]>(
        `http://localhost:8080/api/topics/user/${user.uid}`
      );
      setTopics(res.data);
    } catch (err) {
      console.error('Fetch topics error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTopics();
    }
  }, [user]);

  // Update topic (pass userId as well)
  const updateTopic = async (updatedTopic: Topic) => {
    if (!user) return;

    try {
      const updatedWithUser = { ...updatedTopic, userId: user.uid };

      const res = await axios.put<Topic>(
        `http://localhost:8080/api/topics/${updatedTopic.id}`,
        updatedWithUser
      );

      setTopics((prev) =>
        prev.map((t) => (t.id === updatedTopic.id ? res.data : t))
      );
    } catch (err) {
      console.error('Update topic error:', err);
    }
  };

  if (loading) return <p>Loading topics...</p>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home topics={topics} updateTopic={updateTopic} setTopics={setTopics} />
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddTopic onAdd={fetchTopics} />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites topics={topics} updateTopic={updateTopic} />
            </PrivateRoute>
          }
        />

        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <Stats />
            </PrivateRoute>
          }
        />

        <Route
          path="/company-questions"
          element={
            <PrivateRoute>
              <CompanyQuestions />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <PrivateRoute>
              <Bookmarks topics={topics} updateTopic={updateTopic} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
