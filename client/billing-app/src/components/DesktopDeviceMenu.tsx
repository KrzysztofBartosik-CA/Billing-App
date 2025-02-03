// client/billing-app/src/components/DesktopDeviceMenu.tsx
import React, {FC} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {Receipt as ReceiptIcon} from '@mui/icons-material';
import {menuData} from './menuData';

const DesktopDeviceMenu: FC = () => {
    const handleCloseNavMenu = () => {
        // Add your logic here
    };

    return (
        <>
            <ReceiptIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Billing App
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {menuData.map((item) => (
                    <Button
                        key={item.path}
                        href={item.path}
                        onClick={handleCloseNavMenu}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        {item.label}
                    </Button>
                ))}
            </Box>
        </>
    );
};

export default DesktopDeviceMenu;