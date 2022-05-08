import { makeStyles } from '@mui/styles';
import theme from '../../../../common/theme';

const useStyles = makeStyles({
  stickyField: {
    backgroundColor: theme.palette.grey['50'],
    position: 'sticky',
    top: '80px',
    zIndex: 2,
  },
  myBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default useStyles;
