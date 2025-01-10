import React, { useState, useEffect } from 'react';

function App() {
  const [goals, setGoals] = useState([]);
  const [quote, setQuote] = useState(null);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/goals')
      .then((res) => res.json())
      .then(setGoals)
      .catch(console.error);

    fetch(process.env.REACT_APP_API_URL + '/api/quotes/random')
      .then((res) => res.json())
      .then(setQuote)
      .catch(console.error);
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + '/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal),
      });
      const goal = await res.json();
      setGoals([goal, ...goals]);
      setNewGoal({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.h1}>NEURO::v1.0</h1>
      </header>

      <div style={styles.card}>
        <div style={styles.cardHeader}>> QUOTE.exe</div>
        {quote && (
          <div>
            <p>"{quote.text}"</p>
            <p style={styles.author}>- {quote.author}</p>
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>> NEW_GOAL.exe</div>
        <form onSubmit={addGoal}>
          <input
            style={styles.input}
            placeholder="Goal Title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <textarea
            style={{ ...styles.input, height: '80px' }}
            placeholder="Description"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          />
          <button style={styles.button} type="submit">INITIALIZE GOAL</button>
        </form>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>> GOALS.dat</div>
        {goals.map((goal) => (
          <div key={goal.id} style={styles.goalItem}>
            <h3>{goal.title}</h3>
            <p>{goal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  app: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '"Share Tech Mono", monospace',
    color: '#FFB000',
    backgroundColor: '#0A0A0A',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  h1: {
    fontSize: '28px',
    marginBottom: '16px',
    color: '#FFB000'
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: '4px',
    padding: '20px',
    marginBottom: '20px',
  },
  cardHeader: {
    color: '#00FF00',
    marginBottom: '16px',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    backgroundColor: '#2A2A2A',
    border: '1px solid #444',
    color: '#FFB000',
    fontFamily: '"Share Tech Mono", monospace',
  },
  button: {
    backgroundColor: '#444',
    color: '#FFB000',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: '"Share Tech Mono", monospace',
  },
  goalItem: {
    borderBottom: '1px solid #444',
    paddingBottom: '16px',
    marginBottom: '16px',
  },
  author: {
    color: '#888',
    fontStyle: 'italic',
  }
};

export default App;