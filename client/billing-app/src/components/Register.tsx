import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {register} from '../services/authService';
import {AuthContext} from '../context/AuthContext';
import {useToast} from '../context/ToastContext';
import {Box, Typography, Button} from '@mui/material';
import {useTranslation} from '../hooks/useTranslation';
import UserForm from './UserForm';
import './scss/Register.scss';

const Register = () => {
    const {i18n} = useTranslation();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {showToast} = useToast();

    const handleRegister = async (userData: {
        username: string;
        password: string;
        repeatPassword?: string;
        firstName?: string;
        lastName?: string;
        address?: string;
        email: string;
    }) => {
        try {
            await register(userData);
            showToast('success', i18n('registration_successful'));
            await authContext?.login(userData.username, userData.password);
            navigate('/');
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'unknown reason';
            showToast('error', `${i18n('registration_failed')} - ${errorMessage}`);
        }
    };

    return (
        <Box className="register-form">
            <UserForm onSubmit={handleRegister} isRegister={true}/>
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