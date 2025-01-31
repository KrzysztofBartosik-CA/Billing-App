import React from 'react';
import {Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography} from '@mui/material';

interface UserMenuProps {
    anchorElUser: HTMLElement | null;
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseUserMenu: (event: any) => void;
}

const changeLanguage = (event: React.MouseEvent<HTMLElement>): void => {
    const value = (event.currentTarget as HTMLElement).getAttribute('value');
    if (value) {
        console.log(value);
    }
};

const UserMenu = () => {
    const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);

    const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLangMenu = (event: any) => {
        const value = (event.currentTarget as HTMLElement).getAttribute('value');
        if (value) {
            console.log(value);
        }
        setAnchorElLang(null);
    };

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="User panel">
                <IconButton onClick={handleOpenLangMenu} sx={{p: 0}}>
                    <Avatar alt="Semy Sharp" src=""/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElLang}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLangMenu}
            >
                <MenuItem key={"en-change"} value="en" onClick={handleCloseLangMenu}>
                    <Typography sx={{textAlign: 'center'}}>English</Typography>
                </MenuItem>
                <MenuItem key={"pl-change"} value="pl" onClick={handleCloseLangMenu}>
                    <Typography sx={{textAlign: 'center'}}>Polski</Typography>
                </MenuItem>
                <MenuItem key={"de-change"} value="de" onClick={handleCloseLangMenu}>
                    <Typography sx={{textAlign: 'center'}}>Deutsch</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;