import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import UserForm from './UserForm';
import './scss/User.scss';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const User = () => {
    const { i18n } = useTranslation();
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        if (user) {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:2000/users/${user.id}`, { withCredentials: true });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    const handleSave = async (updatedUserData: {
        username: string;
        password: string;
        firstName?: string;
        lastName?: string;
        address?: string;
        email: string;
    }) => {
        setLoading(true);
        try {
            await axios.patch(`http://localhost:2000/users/${user?.id}`, updatedUserData, { withCredentials: true });
            console.log('User data saved:', updatedUserData);
            await fetchUserData(); // Refetch user data after saving
        } catch (error) {
            console.error('Error saving user data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="register-form">
            <h2 className="user__title">{i18n('user_data')}</h2>
            {loading ? (
                <CircularProgress />
            ) : (
                <UserForm onSubmit={handleSave} initialData={userData} />
            )}
        </Box>
    );
};

export default User;