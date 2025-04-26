const {useState, useEffect } = React;

function FeedbackForm({onAddFeedback }) {
  const[name,setName] =useState('');
  const [email,setEmail] = useState('');
  const [comment,setComment] =useState('');
  const [message, setMessage]= useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setMessage('All fields are required');
      return;
    }
    if (!test(email)) {
      setMessage('Please enter a valid email');
      return;
    }
    const newFeedback = {
      id:Date.now(),
      name,
      email,
      comment
    };
    onAddFeedback(newFeedback);
    setName('');
    setEmail('');
    setComment('');
    setMessage('Feedback submitted successfully!');
    setTimeout(() =>setMessage(''), 3000);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) =>setEmail(e.target.value)}
      />
      <textarea 
        placeholder="Comment" 
        value={comment}
        onChange={(e) =>setComment(e.target.value)}
      />
      <button type="submit">Submit</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
}

function FeedbackItem({ feedback, onDelete }) {
  return (
    <div className="feedback-item">
      <h3>{feedback.name}</h3>
      <p>{feedback.comment}</p>
      <small>{feedback.email}</small>
      <button onClick={() =>onDelete(feedback.id)}>Delete</button>
    </div>
  );
}

function FeedbackList({ feedbacks, onDeleteFeedback }) {
  return (
    <div className="feedback-list">
      {feedbacks.map(feedback => (
        <FeedbackItem key={feedback.id} feedback={feedback} onDelete={onDeleteFeedback} />
      ))}
    </div>
  );
}

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

function App() {
  const[feedbacks,setFeedbacks] = useState([]);
  const [theme, setTheme]=useState('light');

  const addFeedback = (feedback) => {
    setFeedbacks([feedback, ...feedbacks]);
  };

  const deleteFeedback =(id) => {
    setFeedbacks(feedbacks.filter(fb => fb.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>Feedback Board</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main className="main">
        <FeedbackForm onAddFeedback={addFeedback} />
        <FeedbackList feedbacks={feedbacks} onDeleteFeedback={deleteFeedback} />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);