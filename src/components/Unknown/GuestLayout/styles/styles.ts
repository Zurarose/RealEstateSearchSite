import { makeStyles } from '@mui/styles';
import theme from '../../../../common/theme';

const useStyles = makeStyles({
  myHalfPageImage: {
    verticalAlign: 'middle',
    objectPosition: '45% 15%',
    objectFit: 'cover',
    height: '100vh',
    width: '100%',
  },
  myFullHeightBox: {
    height: '100vh',
  },
  myGrid: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
});

export default useStyles;
