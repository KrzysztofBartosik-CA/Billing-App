import React from 'react';
import {
    AppBar,
    Toolbar,
    Container
} from '@mui/material';
import LangMenu from "./LangMenu";
import MobileMenu from "./MobileMenu";
import DesktopDeviceMenu from './DesktopDeviceMenu';
import UserMenu from "./UserMenu";


const Header = () => {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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