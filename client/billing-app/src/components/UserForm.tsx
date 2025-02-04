import React, {useState, useEffect} from 'react';
import {TextField, Button, Box} from '@mui/material';
import {useTranslation} from '../hooks/useTranslation';
import {useNavigate} from 'react-router-dom';
import './scss/UserForm.scss';

interface UserFormProps {
    onSubmit: (userData: {
        username: string;
        password: string;
        repeatPassword?: string;
        firstName?: string;
        lastName?: string;
        address?: string;
        email: string;
    }) => void;
    isRegister?: boolean;
    initialData?: {
        username: string;
        password: string;
        firstName?: string;
        lastName?: string;
        address?: string;
        email: string;
    };
}

const UserForm: React.FC<UserFormProps> = ({onSubmit, isRegister = false, initialData}) => {
    const {i18n} = useTranslation();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username);
            setPassword(initialData.password);
            setFirstName(initialData.firstName || '');
            setLastName(initialData.lastName || '');
            setAddress(initialData.address || '');
            setEmail(initialData.email);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasError = false;

        if (!username) {
            setUsernameError(i18n('username_required'));
            hasError = true;
        } else {
            setUsernameError('');
        }

        if (isRegister && !password) {
            setPasswordError(i18n('password_required'));
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (isRegister && password !== repeatPassword) {
            setRepeatPasswordError(i18n('passwords_do_not_match'));
            hasError = true;
        } else {
            setRepeatPasswordError('');
        }

        if (!email) {
            setEmailError(i18n('email_required'));
            hasError = true;
        } else {
            setEmailError('');
        }

        if (hasError) {
            return;
        }

        onSubmit({username, password, repeatPassword, firstName, lastName, address, email});
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="user-form">
            <TextField
                label={i18n('username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
                className="user-form__input"
            />
            {!isRegister && (<Button onClick={() => navigate('/change-password')} variant="outlined" color="secondary">
                {i18n('change_password')}
            </Button>)}
            {isRegister && (
                <TextField
                    label={i18n('password')}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                    className="user-form__input"
                />
            )}
            {isRegister && (
                <TextField
                    label={i18n('repeat_password')}
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    error={!!repeatPasswordError}
                    helperText={repeatPasswordError}
                    className="user-form__input"
                />
            )}
            <TextField
                label={i18n('first_name')}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="user-form__input"
            />
            <TextField
                label={i18n('last_name')}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="user-form__input"
            />
            <TextField
                label={i18n('address')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="user-form__input"
            />
            <TextField
                label={i18n('email')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                className="user-form__input"
            />
            <Button type="submit" variant="contained" color="primary" className="user-form__button">
                {i18n(isRegister ? 'register' : 'save')}
            </Button>
        </Box>
    );
};

export default UserForm;