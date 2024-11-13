import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "@mui/material";
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{backgroundColor: '#31511E'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} onClick={() => navigate('/')}>
                        Safety Predictor
                    </Typography>

                    <Button color={'inherit'} onClick={() => navigate('/dashboard')}>Dashboard</Button>
                    <Button color={'inherit'} onClick={() => navigate('/map')}>Map</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}