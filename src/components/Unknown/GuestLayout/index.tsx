import { Box } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import signInImage from '../../Auth/assets/images/signInImage.png';
import VoypostLogo from '../../Auth/assets/utils/VoypostLogo';
import useStyles from './styles/styles';

interface GuestLayoutProps {
  children: React.ReactElement;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.myFullHeightBox}>
      <Grid container className={classes.myFullHeightBox}>
        <Grid item xs={6} className={classes.myGrid}>
          <img
            className={classes.myHalfPageImage}
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
          <Box sx={{ mt: 5 }}>
            <VoypostLogo />
          </Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuestLayout;
