import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  threeLinesField: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    overflow: 'hidden',
  },
  fullHeight: {
    height: '200px',
  },
  flexBoxCard: {
    display: 'flex',
    height: '240px',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardBtn: {
    backgroundColor: '#F5005720',
    padding: 0,
    '&:hover': {
      backgroundColor: '#ed4b8220',
    },
  },
});

export default useStyles;
