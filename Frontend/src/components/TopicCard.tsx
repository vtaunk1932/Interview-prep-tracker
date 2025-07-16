import React, { useState, useEffect } from 'react';
import { Topic } from '../types/Topic';
import './TopicCard.css';

interface Props {
  topic: Topic;
  onUpdate?: (updatedTopic: Topic) => void;
  onDelete?: (deletedId: number) => void; // 👈 add delete callback
}

const TopicCard: React.FC<Props> = ({ topic, onUpdate, onDelete }) => {
  const [note, setNote] = useState(topic.notes || '');
  const [currentStatus, setCurrentStatus] = useState(topic.status);

  useEffect(() => {
    setNote(topic.notes || '');
    setCurrentStatus(topic.status);
  }, [topic]);

  const updateTopicBackend = async (updatedTopic: Topic) => {
    try {
      const response = await fetch(`http://localhost:8080/api/topics/${topic.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTopic),
      });

      if (!response.ok) throw new Error('Update failed');

      const result = await response.json();
      onUpdate?.(result);
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/topics/${topic.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');
      onDelete?.(topic.id); // Notify parent to remove topic
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const toggleFavorite = () => {
    const updated = { ...topic, isFavorite: !topic.isFavorite };
    updateTopicBackend(updated);
  };

  const toggleBookmark = () => {
    const updated = { ...topic, isBookmarked: !topic.isBookmarked };
    updateTopicBackend(updated);
  };

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Topic['status'];
    const today = new Date().toISOString().split('T')[0];

    const updated: Topic = {
      ...topic,
      status: newStatus,
      completedDate: newStatus === 'Completed' ? today : '',
    };

    setCurrentStatus(newStatus);
    updateTopicBackend(updated);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);
    const updated = { ...topic, notes: updatedNote };
    updateTopicBackend(updated);
  };

  return (
    <div className="topic-card">
      <div className="card-header">
        <h3>{topic.name}</h3>
        <div className="icon-group">
          <span
            className={`star-icon ${topic.isFavorite ? 'favorited' : ''}`}
            onClick={toggleFavorite}
            title={topic.isFavorite ? 'Unmark Favorite' : 'Mark as Favorite'}
          >
            ★
          </span>
          <span
            className={`bookmark-icon ${topic.isBookmarked ? 'bookmarked' : ''}`}
            onClick={toggleBookmark}
            title={topic.isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          >
            🔖
          </span>
          <span
            className="delete-icon"
            onClick={handleDelete}
            title="Delete Topic"
          >
            🗑️
          </span>
        </div>
      </div>

      <div className="tags">
        <span className="tag category">{topic.category}</span>
        <span
          className={`tag difficulty ${topic.difficulty.toLowerCase()}`}
          style={{ color: 'white' }}
        >
          {topic.difficulty}
        </span>
      </div>

      <div className="status-select">
        <label>Status: </label>
        <select
          value={currentStatus}
          onChange={changeStatus}
          className={currentStatus.toLowerCase().replace(/\s/g, '-')}
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="notes-section">
        <label htmlFor={`notes-${topic.id}`}>Notes:</label>
        <textarea
          id={`notes-${topic.id}`}
          value={note}
          onChange={handleNoteChange}
          placeholder="Write notes here..."
          rows={2}
        />
      </div>
    </div>
  );
};

export default TopicCard;
