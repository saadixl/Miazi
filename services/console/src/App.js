import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Newsfeed from './components/sections/Newsfeed';
import Navbar from './components/widgets/Navbar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#121212'
    }
  },
});

export function App(props) {
  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Navbar theme={darkTheme}/>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1, marginTop: '10px', padding: '10px 25px' }}>
          <Grid container spacing={2}>
            <Newsfeed/>
          </Grid>
        </Box>
      </ThemeProvider>
    </Container>
  );
}

export default App;