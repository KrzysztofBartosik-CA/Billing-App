import React from 'react';
import {Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography} from '@mui/material';


const UserMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event: any) => {
        const value = (event.currentTarget as HTMLElement).getAttribute('value');
        if (value) {
            console.log(value);
        }
        setAnchorElUser(null);
    };

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="User panel">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="Semy Sharp" src=""/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key="user-settings" value="user-settings" onClick={handleCloseUserMenu}>
                    <Typography sx={{textAlign: 'center'}}>User settings</Typography>
                </MenuItem>
                <MenuItem key="logout-btn" value="logout" onClick={handleCloseUserMenu}>
                    <Typography sx={{textAlign: 'center'}}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;