import React from 'react';
import { Topic } from '../types/Topic';
import TopicCard from '../components/TopicCard';
import './Bookmarks.css';

const Bookmarks: React.FC<{ topics: Topic[]; updateTopic: (updated: Topic) => void }> = ({
  topics,
  updateTopic,
}) => {
  const bookmarkedTopics = topics.filter((t) => t.isBookmarked);

  return (
    <div className="bookmarks-page">
      <h2>📌 Bookmarked Topics</h2>
      {bookmarkedTopics.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="topics-list">
          {bookmarkedTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} onUpdate={updateTopic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
