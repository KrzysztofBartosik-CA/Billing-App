import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { TextField, Button, Typography, Box } from '@mui/material';
import './css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { showToast } = useToast();

  if (!authContext) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameError(!username);
    setPasswordError(!password);

    if (!username || !password) {
      showToast('error', 'Please fill in both fields');
      return;
    }

    try {
      await authContext.login(username, password);
      showToast('success', 'Login successful');
      navigate('/');
    } catch (error) {
      showToast('error', 'Login failed');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="login-form"
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={usernameError}
        helperText={usernameError ? 'Username is required' : ''}
        className="login-form__input"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        helperText={passwordError ? 'Password is required' : ''}
        className="login-form__input"
      />
      <Button type="submit" variant="contained" color="primary" className="login-form__button">
        Login
      </Button>
      <Typography variant="body2" className="login-form__register">
        Don't have an account?{' '}
        <Button color="primary" onClick={() => navigate('/register')}>
          Register
        </Button>
      </Typography>
    </Box>
  );
};

export default Login;