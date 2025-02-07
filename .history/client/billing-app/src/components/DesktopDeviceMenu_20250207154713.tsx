import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Receipt as ReceiptIcon } from '@mui/icons-material';
import { menuData } from './menuData';
import { useNavigate } from "react-router-dom";
import { useTranslation } from '../hooks/useTranslation';
import useAuth from "../hooks/useAuth";

const DesktopDeviceMenu: FC = () => {
    const { i18n } = useTranslation();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <>
            <ReceiptIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {i18n('billing_app')}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {menuData.map((item) => {
                    if (!isAdmin && item.role === 'admin') {
                        return null;
                    }
                    return (
                        <Button
                            key={item.path}
                            href={item.path}
                            onClick={(event) => {
                                event.preventDefault();
                                handleNavigation(item.path)
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {i18n(item.label)}
                        </Button>
                    )
                })}
            </Box>
        </>
    );
};

export default DesktopDeviceMenu;