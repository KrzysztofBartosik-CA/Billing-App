import React from 'react';
import {Box, IconButton, Menu, MenuItem, Typography} from '@mui/material';
import {Menu as MenuIcon, Receipt as ReceiptIcon} from '@mui/icons-material';
import {menuData} from './menuData';
import {useNavigate} from "react-router-dom";
import {useTranslation} from '../hooks/useTranslation';

const MobileMenu = () => {
    const {i18n} = useTranslation();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleNavigation = (path: string) => {
        handleCloseNavMenu();
        navigate(path);
    }

    const handleCloseNavMenu = () => {
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
                    {menuData.map((item) => (
                        <MenuItem key={item.path} onClick={(event) => {
                            event.preventDefault();
                            handleNavigation(item.path)
                        }}>
                            <Typography sx={{textAlign: 'center'}} component="a" href={item.path}>
                                {i18n(item.label)}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <ReceiptIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
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
                {i18n('billing_app')}
            </Typography>
        </>
    );
};

export default MobileMenu;