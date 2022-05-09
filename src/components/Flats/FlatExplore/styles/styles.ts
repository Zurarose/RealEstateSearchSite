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
    alignContent: 'center',
  },
  mySideBar: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'calc(100vh - 65px)',
    position: 'sticky',
    backgroundColor: '#dbdbdb',
    color: 'white',
    top: '65px',
    zIndex: 2,
  },
});

export default useStyles;
