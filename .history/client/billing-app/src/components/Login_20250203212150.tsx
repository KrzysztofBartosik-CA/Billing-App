import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useToast} from '../context/ToastContext';
import {TextField, Button, Typography, Box} from '@mui/material';
import {useTranslation} from '../hooks/useTranslation';
import './scss/Login.scss';

const Login = () => {
    const {i18n} = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {showToast} = useToast();

    if (!authContext) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsernameError(!username);
        setPasswordError(!password);

        if (!username || !password) {
            showToast('error', i18n('please_fill_in_both_fields'));
            return;
        }

        try {
            await authContext.login(username, password);
            showToast('success', i18n('login_successful'));
            navigate('/');
        } catch (error) {
            showToast('error', i18n('login_failed'));
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="login-form"
        >
            <TextField
                label={i18n('username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={usernameError ? i18n('username_required') : ''}
                className="login-form__input"
            />
            <TextField
                label={i18n('password')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? i18n('password_required') : ''}
                className="login-form__input"
            />
            <Button type="submit" variant="contained" color="primary" className="login-form__button">
                {i18n('login')}
            </Button>
            <Typography variant="body2" className="login-form__register">
                {i18n('dont_have_account')}{' '}
                <Button color="primary" onClick={() => navigate('/register')}>
                    {i18n('register')}
                </Button>
            </Typography>
        </Box>
    );
};

export default Login;