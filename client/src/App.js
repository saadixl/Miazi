import React, { useEffect } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { connect } from 'react-redux';
import { listNews } from './store/actions/newsActions';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

export function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
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

function NewsItem(props) {
  const { topic, title, url, pubDate } = props;
  return (<ListItem alignItems="flex-start">
  <ListItemAvatar>
    <Avatar alt={topic.toUpperCase()} src="/static/images/avatar/1.jpg" />
  </ListItemAvatar>
  <ListItemText
    primary={title}
    secondary={
      <React.Fragment>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          <a href={url} target="_blank">Read more</a>
        </Typography>
      </React.Fragment>
    }
  />
</ListItem>);
}

function AlignItemsList(props) {
  return (
    <List sx={{ width: '100%', minHeight: '80vh'}}>
      {props.children}
    </List>
  );
}

function GridItemTitle(props) {
  return (<Typography 
    variant="h7"
    align="left"
    component="p"
    sx={{
      padding: '10px 15px',
      fontWeight: 'bold'
    }}
  >
    {props.children}
  </Typography>);
};

function NewsTopic(props) {
  const { news } = props;
  return news.map((item) => {
    const { guid, link, pubDate, title } = item;
    return <span key={guid}>
      <NewsItem topic="world" title={title} url={link} pubDate={pubDate} />
      <Divider variant="inset" component="li" />
    </span>;
  });
}

export function App(props) {
  useEffect(() => {
    props.listNews();
  }, []);

  const { news } = props;
  let renderNewsTopic = null;
  if(!news.loading && news.payload) {
    const { payload } = news;
    console.log("payload", payload.world);
    renderNewsTopic = <NewsTopic news={payload.world}/>;
  }

  return (
    <Container maxWidth="xl" disableGutters={true}>
      <ButtonAppBar/>
      <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1, marginTop: '10px', padding: '10px 25px'  }}>
        <Grid container spacing={2}>
          <Grid item md={3}></Grid>
          <Grid item xs={12} md={6}>
            <Item>
              <GridItemTitle>Newsfeed</GridItemTitle>
              <AlignItemsList>
                {renderNewsTopic}
              </AlignItemsList>
            </Item>
          </Grid>
        </Grid>
        </Box>
        </ThemeProvider>
    </Container>
  );
}

const mapStateToProps  = (state) => ({ news: state.news });

export default connect(mapStateToProps, {listNews})(App);