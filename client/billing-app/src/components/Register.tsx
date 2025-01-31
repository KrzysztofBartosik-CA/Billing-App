import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { TextField, Button, Typography, Box } from '@mui/material';
import './scss/Register.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameError(!username);
    setPasswordError(!password);
    setRepeatPasswordError(password !== repeatPassword);

    if (!username || !password || password !== repeatPassword) {
      showToast('error', 'Please fill in all fields correctly');
      return;
    }

    try {
      await register(username, password);
      showToast('success', 'Registration successful');
      await authContext?.login(username, password);
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'unknown reason';
      showToast('error', `Registration failed - ${errorMessage}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="register-form"
    >
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={usernameError}
        helperText={usernameError ? 'Username is required' : ''}
        className="register-form__input"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        helperText={passwordError ? 'Password is required' : ''}
        className="register-form__input"
      />
      <TextField
        label="Repeat Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        error={repeatPasswordError}
        helperText={repeatPasswordError ? 'Passwords do not match' : ''}
        className="register-form__input"
      />
      <Button type="submit" variant="contained" color="primary" className="register-form__button">
        Register
      </Button>
      <Typography variant="body2" className="register-form__login">
        Already have an account?{' '}
        <Button color="primary" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Typography>
    </Box>
  );
};

export default Register;