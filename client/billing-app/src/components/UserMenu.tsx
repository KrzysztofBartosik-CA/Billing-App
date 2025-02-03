import React from 'react';
import {Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {logout} from "../services/authService";


const UserMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleNavigationToUsrPanel = (event:any) => {
        navigate("/user");
        handleCloseUserMenu(event);
    }

    const handleLogout = (event:any) => {
        logout().then(() => {
            navigate("/login");
        });
    }

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
                <MenuItem key="user-settings" value="user-settings" onClick={handleNavigationToUsrPanel}>
                    <Typography sx={{textAlign: 'center'}}>User settings</Typography>
                </MenuItem>
                <MenuItem key="logout-btn" value="logout" onClick={handleLogout}>
                    <Typography sx={{textAlign: 'center'}}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;