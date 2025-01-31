import React, {useContext, useState} from 'react';
import {
    AppBar,
    Toolbar,
    Grid2 as Grid,
    Button,
    Select,
    MenuItem,
    SelectChangeEvent,
    Container,
    Box,
    IconButton,
    Menu,
    Avatar,
    Tooltip
} from '@mui/material';
import {Receipt as ReceiptIcon, Menu as MenuIcon} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import LangMenu from "./LangMenu";
import MobileMenu from "./MobileMenu";
import DesktopDeviceMenu from './DesktopDeviceMenu';
import UserMenu from "./UserMenu";

const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const [language, setLanguage] = useState('en');

    const changeLanguage = (event: SelectChangeEvent<string>): void => {
        setLanguage(event.target.value as string);
    };

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event: any) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (event: any) => {
        const value = (event.currentTarget as HTMLElement).getAttribute('value');
        if (value) {
            console.log(value);
        }
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*<ReceiptIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>*/}
                    {/*<Typography*/}
                    {/*    variant="h6"*/}
                    {/*    noWrap*/}
                    {/*    component="a"*/}
                    {/*    href="#app-bar-with-responsive-menu"*/}
                    {/*    sx={{*/}
                    {/*        mr: 2,*/}
                    {/*        display: {xs: 'none', md: 'flex'},*/}
                    {/*        fontFamily: 'monospace',*/}
                    {/*        fontWeight: 700,*/}
                    {/*        letterSpacing: '.3rem',*/}
                    {/*        color: 'inherit',*/}
                    {/*        textDecoration: 'none',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Billing App*/}
                    {/*</Typography>*/}

                    <MobileMenu/>
                    <DesktopDeviceMenu/>
                    <LangMenu/>
                    <UserMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;