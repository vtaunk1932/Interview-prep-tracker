import React, { useEffect, useState } from 'react';
import TopicCard from '../components/TopicCard';
import { Topic } from '../types/Topic';
import './Home.css';

interface HomeProps {
  topics: Topic[];
  updateTopic: (topic: Topic) => void;
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>; // <-- Add this prop
}

const Home: React.FC<HomeProps> = ({ topics, updateTopic, setTopics }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    const stored = localStorage.getItem('dailyGoal');
    return stored ? parseInt(stored) : 2;
  });

  const [todayCompleted, setTodayCompleted] = useState<number>(0);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    const today = getTodayDate();
    const completedToday = topics.filter((topic) => topic.completedDate === today).length;
    setTodayCompleted(completedToday);
  }, [topics]);

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setDailyGoal(val);
      localStorage.setItem('dailyGoal', val.toString());
    }
  };

  const handleDeleteTopic = (id: number) => {
    setTopics(prev => prev.filter(topic => topic.id !== id));
  };

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? topic.category === categoryFilter : true;
    const matchesDifficulty = difficultyFilter ? topic.difficulty === difficultyFilter : true;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const uniqueCategories = Array.from(new Set(topics.map((t) => t.category || 'Uncategorized')));
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="home">
      <h1 className="topics-heading">🎯 Interview Prep Topics</h1>

      {/* Daily Goal Section */}
      <div className="goal-tracker">
        <label>
          🎯 Daily Goal:
          <input
            type="number"
            value={dailyGoal}
            onChange={handleGoalChange}
            min={1}
            className="goal-input"
          />
        </label>
        <p>📈 Completed Today: <strong>{todayCompleted}</strong></p>
        <progress value={todayCompleted} max={dailyGoal} />
        {todayCompleted >= dailyGoal ? (
          <p className="goal-achieved">✅ You achieved your daily goal!</p>
        ) : (
          <p className="goal-pending">⏳ Keep going! You’re almost there.</p>
        )}
      </div>

      {/* Filter Section */}
      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon" role="img" aria-label="search">🔍</span>
        </div>

        <select
          className="filter-dropdown"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="filter-dropdown"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="">All Difficulties</option>
          {difficulties.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Topic List Section */}
      {filteredTopics.length === 0 ? (
        <p className="no-topics-msg">😕 No topics match your search or filters.</p>
      ) : (
        <div className="topics-list">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onUpdate={updateTopic}
              onDelete={handleDeleteTopic} // ✅ Pass delete handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
