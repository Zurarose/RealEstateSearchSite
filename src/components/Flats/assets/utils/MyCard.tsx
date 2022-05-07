import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Flat } from '../../../../../types';

const useStyles = makeStyles({
  threeLinesField: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
  },
  fullHeight: {
    flex: '1 0 auto',
  },
  flexBoxCard: {
    display: 'flex',
    height: '240px',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const MyCard = ({
  address,
  latitude,
  longitude,
  cityName,
  description,
  dailyPriceUsd,
  photoUrl,
  publishedAt,
}: Flat) => {
  const classes = useStyles();

  return (
    <>
      <Card sx={{ mt: 2 }} className={classes.flexBoxCard}>
        <Grid container>
          <Grid item xs={6}>
            <CardMedia
              sx={{
                verticalAlign: 'middle',
                objectPosition: '45% 455%',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              component="img"
              image={photoUrl}
            />
          </Grid>
          <Box className={classes.cardBody}>
            <CardContent className={classes.fullHeight}>
              <Typography component="div" variant="h4">
                {`$${dailyPriceUsd} / night`}
              </Typography>
              <Typography
                className={classes.threeLinesField}
                sx={{ mt: 2 }}
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {address}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {description}
              </Typography>
            </CardContent>
            <Box sx={{ pl: 1, pb: 1 }}>
              <Button component={RouterLink} variant="text" to="/register">
                DETAIL
              </Button>
            </Box>
          </Box>
        </Grid>
      </Card>
    </>
  );
};

export default MyCard;
