
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/login', {
        username,
        password
      });

      // Save the JWT token in local storage
      localStorage.setItem('token', response.data.token);

      // Navigate to the protected dashboard
      navigate('/dashboard');
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Login failed'
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && <p>{message}</p>}

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
