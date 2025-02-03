import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Welcome = () => {
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
                Hello {userName}!
            </Typography>
            <Typography variant="body1" gutterBottom mb={4}>
                Click the button below to see your invoices or use the menu to add the next invoice.
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleNavigate}>
                See Invoices
            </Button>
        </Box>
    );
};

export default Welcome;