
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Dashboard() {
  const [message, setMessage] = useState('Loading...');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await api.get('/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setMessage(response.data.message);
        setUsername(response.data.username);
      } catch (error) {
        localStorage.removeItem('token');
        setError(
          error.response?.data?.message ||
          'Unable to access protected route'
        );
        navigate('/login', { replace: true });
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="auth-container">
      <div className="auth-form dashboard">
        <h2>Dashboard</h2>

        {username && <h3>Welcome, {username}!</h3>}

        <p>{error || message}</p>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
