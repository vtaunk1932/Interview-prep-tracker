import React, { useState, useEffect } from 'react';
import { CompanyQuestion } from '../types/CompanyQuestion';
import './CompanyQuestions.css';

const CompanyQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<CompanyQuestion[]>([]);
  const [companyFilter, setCompanyFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newQuestion, setNewQuestion] = useState<Partial<CompanyQuestion>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<CompanyQuestion>>({});
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/company-questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching company questions:", err);
        setError("Could not fetch questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const toggleComplete = async (id: number) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, completed: !q.completed } : q
    );
    setQuestions(updated);

    try {
      await fetch(`http://localhost:8080/api/company-questions/${id}/toggle-complete`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error updating question status:", error);
    }
  };

  const handleAdd = async () => {
    if (!newQuestion.company || !newQuestion.question) return;
    try {
      const response = await fetch("http://localhost:8080/api/company-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });
      const saved = await response.json();
      setQuestions([...questions, saved]);
      setNewQuestion({});
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/company-questions/${id}`, {
        method: "DELETE",
      });
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const startEdit = (q: CompanyQuestion) => {
    setEditId(q.id);
    setEditData(q);
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/company-questions/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const updated = await response.json();
      setQuestions(
        questions.map((q) => (q.id === editId ? updated : q))
      );
      setEditId(null);
      setEditData({});
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const filtered = questions.filter(
    (q) =>
      (companyFilter ? q.company === companyFilter : true) &&
      q.question.toLowerCase().includes(search.toLowerCase())
  );

  const uniqueCompanies = [...new Set(questions.map((q) => q.company))];

  return (
    <div className="company-questions">
      <h2>🏢 Company-wise Interview Questions</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
          <option value="">All Companies</option>
          {uniqueCompanies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="add-form">
        <input placeholder="Company" value={newQuestion.company || ''} onChange={(e) => setNewQuestion({ ...newQuestion, company: e.target.value })} />
        <input placeholder="Question" value={newQuestion.question || ''} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />
        <input placeholder="Topic" value={newQuestion.topic || ''} onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })} />
        <select value={newQuestion.difficulty || ''} onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard'})}>
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button onClick={handleAdd}>➕ Add Question</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul className="question-list">
          {filtered.map((q) => (
            <li key={q.id} className={q.completed ? 'completed' : ''}>
              {editId === q.id ? (
                <div className="edit-form">
                  <input value={editData.company || ''} onChange={(e) => setEditData({ ...editData, company: e.target.value })} />
                  <input value={editData.question || ''} onChange={(e) => setEditData({ ...editData, question: e.target.value })} />
                  <input value={editData.topic || ''} onChange={(e) => setEditData({ ...editData, topic: e.target.value })} />
                  <select value={editData.difficulty || ''} onChange={(e) => setEditData({ ...editData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}>
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <div>
                    <button onClick={handleEditSave}>💾 Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <strong>{q.company}:</strong>{' '}
                    {expandedIds.has(q.id) ? q.question : `${q.question.slice(0, 100)}...`}
                    {q.question.length > 100 && (
                      <button className="toggle-btn" onClick={() => toggleExpand(q.id)}>
                        {expandedIds.has(q.id) ? "Show Less" : "Show More"}
                      </button>
                    )}
                    <span className={`difficulty ${q.difficulty.toLowerCase()}`}>
                      ({q.difficulty})
                    </span>
                  </div>
                  <div>
                    <button onClick={() => toggleComplete(q.id)}>
                      {q.completed ? '✅ Done' : 'Mark as Done'}
                    </button>
                    <button onClick={() => startEdit(q)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(q.id)}>🗑️ Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyQuestions;
