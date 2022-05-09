import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import useStyles from './styles';

const MyCard = ({ ...props }: any): ReactJSXElement => {
  const classes = useStyles();
  const [elevation, setElevation] = useState(3);
  const history = useHistory();
  const { search } = useLocation();

  const handleClick = () => {
    setElevation(1);
    props.setSelectedItem({
      latitude: props.latitude,
      longitude: props.longitude,
    });
    const searchField = new URLSearchParams(search).get('city');
    const path = `/flats/${props.id}`;
    if (searchField) {
      history.push({
        pathname: path,
        search: `?city=${searchField}`,
      });
    } else {
      history.push({
        pathname: path,
      });
    }
  };

  return (
    <>
      <Card
        sx={{ mt: 2 }}
        className={classes.flexBoxCard}
        elevation={elevation}
      >
        <Grid container>
          <Grid item xs={6}>
            <CardMedia
              className={classes.cardImg}
              component="img"
              image={props.photoUrl}
            />
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.cardBody}>
              <CardContent className={classes.fullHeight}>
                <Typography component="div" variant="h4">
                  {`$${props.dailyPriceUsd} / night`}
                </Typography>
                <Typography
                  sx={{ mt: 2 }}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  {props.address}
                </Typography>
                <Typography
                  className={classes.threeLinesField}
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {props.description}
                </Typography>
              </CardContent>
              <Box>
                <Button
                  onClick={handleClick}
                  onBlur={() => setElevation(3)}
                  sx={{ ml: 2, mb: 2 }}
                  disableRipple
                  className={classes.cardBtn}
                  variant="text"
                >
                  DETAILS
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default MyCard;
