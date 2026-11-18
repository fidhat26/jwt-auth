
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/register', {
        username,
        password
      });

      setMessage(response.data.message);

      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Registration failed'
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username (min. 3 characters)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
          required
        />

        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Register</button>

        {message && <p>{message}</p>}

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
