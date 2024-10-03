import React from 'react';
import { Box, Typography } from '@mui/material';

const SettingsPage = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Settings</Typography>
            {/* Add your settings content here */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Here you can manage your application settings.
            </Typography>
        </Box>
    );
};

export default SettingsPage;
