import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import useStyles from './styles/styles';
import getFlats from '../../../common/getFlats';
import googleApi from '../../../common/googleApi';
import { UIContext } from '../../Unknown/UIContext';
import MyCard from '../assets/utils/MyCard';

const FlatExplore: React.FC = () => {
  const classes = useStyles();
  const { setAlert } = useContext(UIContext);
  const [flats, setFlats] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getFlats();
        if (result) {
          setFlats(result);
        } else throw new Error('No data');
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      }
    })();
  }, [setAlert]);

  const handleSearch = async () => {};
  return (
    <Container maxWidth="xl">
      <Grid container maxWidth="lg">
        <Grid item xs={6} className={classes.myBox}>
          <TextField
            className={classes.stickyField}
            onChange={(e) => {
              googleApi(e.target);
            }}
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ mt: 2 }}
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="City"
            variant="filled"
          />
          <Box sx={{ mt: 5 }}>
            <Typography variant="h4">Flats to rent</Typography>
          </Box>
          {flats &&
            flats.map((item) => {
              return (
                <MyCard
                  key={item.address + item.latitude + item.longitude}
                  {...item}
                />
              );
            })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlatExplore;
