import React, { useContext, useState } from 'react';
import { Box, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './scss/Menu.scss';

const Menu = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [language, setLanguage] = useState('en');

  const changeLanguage = (event: SelectChangeEvent<string>): void => {
    setLanguage(event.target.value as string);
  };

  return (
    <Box className="menu">
      <Box className="menu__container">
        <Box className="menu__items">
          <Button variant="text" onClick={() => navigate('/invoices')} className="menu__link">Home</Button>
          <Button variant="text" onClick={() => navigate('/user')} className="menu__link">My account</Button>
        </Box>
        <Box className="menu__controls">
          <Select value={language} onChange={changeLanguage} className="menu__select">
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="pl">Polski</MenuItem>
            <MenuItem value="de">Deutsch</MenuItem>
          </Select>
          <Button variant="outlined" onClick={authContext?.logout} className="menu__logout">Logout</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;