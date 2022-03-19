import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function Navbar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={props.theme}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Miazi Console
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </ThemeProvider>
        </Box>
    );
}