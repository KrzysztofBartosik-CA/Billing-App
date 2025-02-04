import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {register} from '../services/authService';
import {AuthContext} from '../context/AuthContext';
import {useToast} from '../context/ToastContext';
import {TextField, Button, Typography, Box} from '@mui/material';
import {useTranslation} from '../hooks/useTranslation';
import './scss/Register.scss';

const Register = () => {
    const {i18n} = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {showToast} = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsernameError(!username);
        setPasswordError(!password);
        setRepeatPasswordError(password !== repeatPassword);
        setEmailError(!email);

        if (!username || !password || password !== repeatPassword || !email) {
            showToast('error', i18n('please_fill_in_all_fields'));
            return;
        }

        try {
            await register({username, password, firstName, lastName, address, email});
            showToast('success', i18n('registration_successful'));
            await authContext?.login(username, password);
            navigate('/');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'unknown reason';
            showToast('error', `${i18n('registration_failed')} - ${errorMessage}`);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="register-form"
        >
            <TextField
                label={i18n('username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={usernameError ? i18n('username_required') : ''}
                className="register-form__input"
            />
            <TextField
                label={i18n('password')}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? i18n('password_required') : ''}
                className="register-form__input"
            />
            <TextField
                label={i18n('repeat_password')}
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                error={repeatPasswordError}
                helperText={repeatPasswordError ? i18n('passwords_do_not_match') : ''}
                className="register-form__input"
            />
            <TextField
                label={i18n('first_name')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="register-form__input"
            />
            <TextField
                label={i18n('last_name')}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="register-form__input"
            />
            <TextField
                label={i18n('address')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="register-form__input"
            />
            <TextField
                label={i18n('email')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? i18n('email_required') : ''}
                className="register-form__input"
            />
            <Button type="submit" variant="contained" color="primary" className="register-form__button">
                {i18n('register')}
            </Button>
            <Typography variant="body2" className="register-form__login">
                {i18n('already_have_account')}{' '}
                <Button color="primary" onClick={() => navigate('/login')}>
                    {i18n('login')}
                </Button>
            </Typography>
        </Box>
    );
};

export default Register;