import React, { useState, useEffect } from 'react';

function App() {
  const [goals, setGoals] = useState([]);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      // Log the API URL we're using
      console.log('Attempting to fetch from:', process.env.REACT_APP_API_URL);

      try {
        // Fetch quote
        const quoteResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/quotes/random`);
        console.log('Quote response status:', quoteResponse.status);
        
        if (!quoteResponse.ok) {
          throw new Error(`Quote fetch failed with status: ${quoteResponse.status}`);
        }

        const quoteData = await quoteResponse.json();
        console.log('Quote data received:', quoteData);
        setQuote(quoteData);

        // Fetch goals
        const goalsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/goals`);
        console.log('Goals response status:', goalsResponse.status);
        
        if (!goalsResponse.ok) {
          throw new Error(`Goals fetch failed with status: ${goalsResponse.status}`);
        }

        const goalsData = await goalsResponse.json();
        console.log('Goals data received:', goalsData);
        setGoals(goalsData);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal),
      });
      
      if (!res.ok) {
        throw new Error(`Failed to add goal. Status: ${res.status}`);
      }

      const goal = await res.json();
      setGoals([goal, ...goals]);
      setNewGoal({ title: '', description: '' });
    } catch (err) {
      console.error('Error adding goal:', err);
      alert('Failed to add goal: ' + err.message);
    }
  };

  // Debug section to show environment variable
  console.log('Current API URL:', process.env.REACT_APP_API_URL);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.h1}>NEURO::v1.0</h1>
      </header>

      <div style={styles.card}>
        <div style={styles.cardHeader}>> QUOTE.exe</div>
        {loading ? (
          <p>Loading quote...</p>
        ) : error ? (
          <div style={styles.error}>
            <p>Error loading quote: {error}</p>
            <p style={styles.errorDetail}>API URL: {process.env.REACT_APP_API_URL}</p>
          </div>
        ) : quote ? (
          <div>
            <p style={styles.quoteText}>"{quote.text}"</p>
            <p style={styles.author}>- {quote.author}</p>
          </div>
        ) : (
          <p>No quote available</p>
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
        {loading ? (
          <p>Loading goals...</p>
        ) : error ? (
          <p style={styles.error}>Error loading goals: {error}</p>
        ) : goals.length > 0 ? (
          goals.map((goal) => (
            <div key={goal.id} style={styles.goalItem}>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </div>
          ))
        ) : (
          <p>No goals found</p>
        )}
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
  },
  quoteText: {
    fontSize: '18px',
    marginBottom: '8px',
  },
  error: {
    color: '#ff4444',
    marginBottom: '10px',
  },
  errorDetail: {
    fontSize: '12px',
    color: '#888',
    marginTop: '5px',
  }
};

export default App;