// src/pages/Favorites.tsx

import React from 'react';
import TopicCard from '../components/TopicCard';
import { Topic } from '../types/Topic';
import './Favorites.css';

interface FavoritesProps {
  topics: Topic[];
  updateTopic: (updatedTopic: Topic) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ topics, updateTopic }) => {
  const favoriteTopics = topics.filter((topic) => topic.isFavorite);

  return (
    <div className="favorites-page">
      <h2>⭐ Favorite Topics</h2>
      {favoriteTopics.length === 0 ? (
        <p>You haven’t marked any topics as favorite yet.</p>
      ) : (
        favoriteTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} onUpdate={updateTopic} />
        ))
      )}
    </div>
  );
};

export default Favorites;
