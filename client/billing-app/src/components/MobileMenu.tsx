import React from 'react';
import {Box, IconButton, Menu, MenuItem, Typography} from '@mui/material';
import {Menu as MenuIcon, Receipt as ReceiptIcon} from '@mui/icons-material';

const pages = ['Products', 'Pricing', 'Blog'];

const MobileMenu = () => {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event: any) => {
        setAnchorElNav(null);
    };

    return (
        <>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{display: {xs: 'block', md: 'none'}}}
                >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography sx={{textAlign: 'center'}}>{page}</Typography>
                        </MenuItem>
                    ))}
                </Menu>

            </Box>
            <ReceiptIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    display: {xs: 'flex', md: 'none'},
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
        </>

    );
};

export default MobileMenu;