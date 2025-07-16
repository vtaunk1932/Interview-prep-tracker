import React, { useState } from 'react';
import { Topic } from '../types/Topic';
import './AddTopic.css';
import { getAuth } from 'firebase/auth'; // ✅ Firebase Auth import

interface AddTopicProps {
  onAdd?: () => void;
}

const AddTopic: React.FC<AddTopicProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<Omit<Topic, 'id'>>({
    name: '',
    category: '',
    difficulty: 'Easy',
    status: 'Not Started',
    isFavorite: false,
    isBookmarked: false,
    notes: '',
    userId: '',
    completedDate: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('You must be logged in to add a topic.');
      return;
    }

    const topicWithUserId = {
      ...formData,
      userId: user.uid, // ✅ Automatically include userId
    };

    try {
      const response = await fetch('http://localhost:8080/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicWithUserId),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Successfully added:', data);
        alert('✅ Topic added successfully!');
        onAdd?.();

        setFormData({
          name: '',
          category: '',
          difficulty: 'Easy',
          status: 'Not Started',
          isFavorite: false,
          isBookmarked: false,
          notes: '',
          userId: '',
          completedDate: '',
        });
      } else {
        const errText = await response.text();
        console.error('Backend Error:', errText);
        alert('❌ Failed to add topic.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('❌ Something went wrong.');
    }
  };

  return (
    <div className="add-topic-container">
      <h2>Add New Topic</h2>
      <form onSubmit={handleSubmit} className="add-topic-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>

        <label>
          Difficulty:
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>

        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>

        <label>
          <input type="checkbox" name="isFavorite" checked={formData.isFavorite} onChange={handleChange} />
          Mark as Favorite
        </label>

        <label>
          <input type="checkbox" name="isBookmarked" checked={formData.isBookmarked} onChange={handleChange} />
          Add to Bookmarks
        </label>

        <button type="submit">Add Topic</button>
      </form>
    </div>
  );
};

export default AddTopic;
