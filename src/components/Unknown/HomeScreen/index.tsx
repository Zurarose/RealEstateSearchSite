import * as React from 'react';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  myBox: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const HomeScreen: React.FC = () => {
  const classes = useStyles();
  return (
    <Box mt={5} className={classes.myBox}>
      <Button component={RouterLink} to="/flats" variant="contained">
        Explore flats
      </Button>
    </Box>
  );
};

export default HomeScreen;
