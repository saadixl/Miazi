import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { listNews } from '../../store/actions/newsActions';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
  return (
    <Typography 
      variant="h7"
      align="left"
      component="p"
      sx={{
        padding: '10px 15px',
        fontWeight: 'bold'
      }}
    >
      {props.children}
    </Typography>
  );
};
  
function NewsItem(props) {
  const { topic, title, url, pubDate } = props;
  return (
    <ListItem alignItems="flex-start">
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

export function Newsfeed(props) {
    useEffect(() => {
      props.listNews();
    }, []);
    const { news } = props;
    let newsGrids = null;
    if(!news.loading && news.payload) {
      const { payload } = news;
      const topics = Object.keys(payload);
      newsGrids = topics.map((topic, i) => {
        return <NewsGridItem key={topic} topic={topic} news={payload[topic]}/>
      });
    }
    return newsGrids;
  }

const mapStateToProps  = (state) => ({ news: state.news });
export default connect(mapStateToProps, {listNews})(Newsfeed);