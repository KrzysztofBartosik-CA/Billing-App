import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Typography, Box} from '@mui/material';
import {AuthContext} from '../context/AuthContext';
import {useTranslation} from '../hooks/useTranslation';

const Welcome = () => {
    const {i18n} = useTranslation();
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const navigate = useNavigate();

    const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username;

    const handleNavigate = () => {
        navigate('/invoices');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" gutterBottom mb={2}>
                {i18n('hello')} {userName}!
            </Typography>
            <Typography variant="body1" gutterBottom mb={4}>
                {i18n('welcome_message')}
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleNavigate}>
                {i18n('see_invoices')}
            </Button>
        </Box>
    );
};

export default Welcome;