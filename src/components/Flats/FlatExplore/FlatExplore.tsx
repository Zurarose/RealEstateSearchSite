import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { useHistory, useLocation } from 'react-router-dom';
import { DocumentData } from '@firebase/firestore-types';
import useStyles from './styles/styles';
import googleApi from '../../../common/googleApi';
import { UIContext } from '../../Unknown/UIContext';
import MyCard from '../assets/utils/myCard/MyCard';
import filterByCity from '../../../common/filterByCity';

const FlatExplore: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setAlert } = useContext(UIContext);
  const [flats, setFlats] = useState<DocumentData[]>([]);
  const { search } = useLocation();
  const searchField = useRef(new URLSearchParams(search).get('city'));

  useEffect(() => {
    (async () => {
      try {
        const result = await filterByCity(searchField.current);
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

  const changeLocation = useCallback(
    (location) => {
      if (location) {
        history.push({
          search: `?city=${location}`,
        });
      } else {
        history.push({
          search: ``,
        });
      }
    },
    [history],
  );

  const handleSearch = useCallback(
    async (value) => {
      try {
        const result = await filterByCity(value);
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
    },
    [setAlert],
  );

  const handleSet = useCallback(
    async (value) => {
      searchField.current = value;
      changeLocation(value);
      await handleSearch(value);
    },
    [changeLocation, handleSearch],
  );

  const handleChange = useCallback(
    async (e) => {
      if (!e.target.value) {
        await handleSearch(null);
      }
      changeLocation(e.target.value);
      googleApi(e.target, handleSet);
    },
    [changeLocation, handleSearch, handleSet],
  );

  return (
    <Container maxWidth="xl">
      <Grid container maxWidth="lg">
        <Grid item xs={6} className={classes.myBox}>
          <TextField
            sx={{ mt: 2 }}
            defaultValue={searchField.current}
            className={classes.stickyField}
            onChange={(e) => {
              searchField.current = e.target.value;
              handleChange(e);
            }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => handleSearch(searchField.current)}
                >
                  <IconButton
                    sx={{ mt: 2 }}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id="searchField"
            placeholder="Type something"
            label="City"
            variant="filled"
          />
          <Box sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h4">Flats to rent</Typography>
          </Box>
          {flats &&
            flats.map((item) => {
              return (
                <MyCard
                  key={item.photoUrl + item.address}
                  address={item.address}
                  dailyPriceUsd={item.dailyPriceUsd}
                  description={item.description}
                  photoUrl={item.photoUrl}
                />
              );
            })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlatExplore;
