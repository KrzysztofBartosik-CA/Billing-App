import React, {useState, useContext} from 'react';
import {TextField, Button, Box, CircularProgress, Typography} from '@mui/material';
import axios from 'axios';
import {useTranslation} from '../hooks/useTranslation';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import './scss/ChangePassword.scss';
import {CheckCircle} from "@mui/icons-material";

const ChangePassword: React.FC = () => {
    const {i18n} = useTranslation();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
            setError(i18n('passwords_do_not_match'));
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://localhost:2000/users/change-password', {
                userId: user?.id,
                oldPassword,
                newPassword
            }, {withCredentials: true});
            setSuccess(true);
        } catch (error) {
            setError(i18n('error_changing_password'));
        } finally {
            setLoading(false);
        }
    };

    const renderPreloader = () => (
        <CircularProgress/>
    );

    const renderMessageBox = () => (
        <Box gap={2} alignItems="center" justifyContent="center" textAlign="center">
            <Box flexDirection={'row'} display="flex" gap={1} alignItems="center" mb={4}>
                <CheckCircle style={{color: 'green'}}/>
                <Typography>{i18n('successfully_change_password')}</Typography>
            </Box>
            <Button onClick={() => navigate('/')} variant="contained" color="primary">
                {i18n('home_button')}
            </Button>
        </Box>
    );

    const renderForm = () => (
        <Box component="form" onSubmit={handleSubmit} className="change-password-form" gap={2}>
            <TextField
                label={i18n('old_password')}
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="change-password-form__input"
            />
            <TextField
                label={i18n('new_password')}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="change-password-form__input"
            />
            <TextField
                label={i18n('repeat_password')}
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="change-password-form__input"
            />
            {error && <p className="error">{error}</p>}
            <Button type="submit" variant="contained" color="primary" className="change-password-form__button">
                {i18n('change_password')}
            </Button>
        </Box>
    );

    if (loading) {
        return (
            <Box className="change-password-container">
                {renderPreloader()}
            </Box>
        );
    }

    return (
        <Box className="change-password-container">
            {success ? renderMessageBox() : renderForm()}
        </Box>
    );
};

export default ChangePassword;