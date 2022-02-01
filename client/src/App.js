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
    },
    link: {
      main: '#5b3216'
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
        >
          <a href={url} target="_blank">Read more</a>
        </Typography>
      </React.Fragment>
    }
  />
</ListItem>);
}

function NewsGrid(props) {
  return (
    <List sx={{ width: '100%'}}>
      {props.children}
    </List>
  );
}

function NewsGridItem(props) {
  const { news, topic } = props;
  const renderedNews = news.map((item) => {
    const { guid, link, pubDate, title } = item;
    return <span key={guid}>
      <NewsItem topic={topic} title={title} url={link} pubDate={pubDate} />
      <Divider variant="inset" component="li" />
    </span>;
  });

  return (<Grid item xs={12} md={3}>
    <Item>
      <NewsGridItemTitle>{topic.toUpperCase()}</NewsGridItemTitle>
      <NewsGrid>
        {renderedNews}
      </NewsGrid>
    </Item>
  </Grid>);
}

function NewsGridItemTitle(props) {
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



export function App(props) {
  useEffect(() => {
    props.listNews();
  }, []);

  const { news } = props;
  let newsGrids = null;
  if(!news.loading && news.payload) {
    const { payload } = news;
    const topics = Object.keys(payload);
    newsGrids = topics.map((topic) => {
      return <NewsGridItem topic={topic} news={payload[topic]}/>
    });
  }

  return (
    <Container maxWidth="xl" disableGutters={true}>
      <ButtonAppBar/>
      <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1, marginTop: '10px', padding: '10px 25px'  }}>
        <Grid container spacing={2}>
          {newsGrids}
        </Grid>
        </Box>
        </ThemeProvider>
    </Container>
  );
}

const mapStateToProps  = (state) => ({ news: state.news });

export default connect(mapStateToProps, {listNews})(App);