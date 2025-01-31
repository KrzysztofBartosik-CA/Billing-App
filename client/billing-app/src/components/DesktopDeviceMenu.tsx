import React, {FC} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {Receipt as ReceiptIcon} from '@mui/icons-material';

const pages = ['Products', 'Pricing', 'Blog'];

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
                href="#app-bar-with-responsive-menu"
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
                {pages.map((page: string) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        {`${page} 1`}
                    </Button>
                ))}
            </Box>
        </>
    );
};

export default DesktopDeviceMenu;