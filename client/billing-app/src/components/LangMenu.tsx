import React from 'react';
import {Box, FormControl, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import {useLanguage} from '../context/LanguageContext';

const LangMenu = () => {
    const {language, changeLanguage} = useLanguage();

    const handleChange = (event: SelectChangeEvent<string>) => {
        changeLanguage(event.target.value as string);
    };

    return (
        <Box sx={{minWidth: 80}} mr={4}>
            <FormControl fullWidth>
                <Select
                    id="language-select"
                    value={language}
                    onChange={handleChange}
                >
                    <MenuItem value="en">{'EN'}</MenuItem>
                    <MenuItem value="pl">{'PL'}</MenuItem>
                    <MenuItem value="de">{'DE'}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default LangMenu;