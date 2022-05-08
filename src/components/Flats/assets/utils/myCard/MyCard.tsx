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
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import useStyles from './styles';

interface PropsType {
  address: string;
  description: string;
  dailyPriceUsd: number;
  photoUrl: string;
}

const MyCard = ({
  address,
  description,
  dailyPriceUsd,
  photoUrl,
}: PropsType): ReactJSXElement => {
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
          <Grid item xs={6}>
            <Box className={classes.cardBody}>
              <CardContent className={classes.fullHeight}>
                <Typography component="div" variant="h4">
                  {`$${dailyPriceUsd} / night`}
                </Typography>
                <Typography
                  sx={{ mt: 2 }}
                  variant="subtitle1"
                  color="text.secondary"
                >
                  {address}
                </Typography>
                <Typography
                  className={classes.threeLinesField}
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {description}
                </Typography>
              </CardContent>
              <Box>
                <Button
                  sx={{ ml: 2, mb: 2 }}
                  disableRipple
                  className={classes.cardBtn}
                  component={RouterLink}
                  variant="text"
                  to="/flats"
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
