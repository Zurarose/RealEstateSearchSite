import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Route } from 'react-router-dom';
import { Box } from '@mui/material';
import signInImage from '../images/signInImage.png';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const useStyles = makeStyles({
  halfPageImage: {
    verticalAlign: 'middle',
    objectPosition: '45% 15%',
    objectFit: 'cover',
    height: '100vh',
    width: '100%',
  },
  fullHeightBox: {
    height: '100vh',
  },
});

const AuthScreen: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.fullHeightBox}>
      <Grid container className={classes.fullHeightBox}>
        <Grid item xs={6} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <img
            className={classes.halfPageImage}
            id="halfPageImage"
            alt="complex"
            src={signInImage}
          />
        </Grid>
        <Grid
          display="flex"
          width="100%"
          flexDirection="column"
          alignItems="center"
          alignContent="space-between"
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthScreen;
