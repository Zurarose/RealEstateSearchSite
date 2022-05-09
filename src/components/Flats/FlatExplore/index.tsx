import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { Route, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles/styles';
import { UIContext } from '../../Unknown/UIContext';
import MyCard from '../assets/utils/myCard/MyCard';
import filterByCity from '../../../common/filterByCity';
import FlatMap from '../FlatMap';
import { ISelectedItem } from '../FlatMap/types/types';
import { Flat } from '../../../../types';
import googleApi from '../../../common/googleApi';

const FlatExplore: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setAlert } = useContext(UIContext);
  const [flats, setFlats] = useState<Array<Flat> | null>([]);
  const { search } = useLocation();
  const searchField = useRef(new URLSearchParams(search).get('city'));
  const [isLoading, setIsLoading] = useState('No flat selected');
  const [selectedItem, setSelectedItem] = useState<ISelectedItem>({
    latitude: null,
    longitude: null,
  });

  const alert = useCallback(
    (message: string) => {
      setAlert({
        show: true,
        severity: 'error',
        message,
      });
    },
    [setAlert],
  );

  useEffect(() => {
    (async () => {
      try {
        const result = await filterByCity(searchField.current, alert);
        if (result) {
          setFlats(result);
        } else alert('No data');
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      }
    })();
  }, [alert, setAlert]);

  const changeLocation = useCallback(
    (location: string) => {
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
      history.push('/flats');
      if (searchField.current) changeLocation(searchField.current);
      try {
        const result = await filterByCity(value, alert);
        if (result) {
          setFlats(result);
        } else alert('No data');
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      }
    },
    [alert, changeLocation, history, setAlert],
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
    (e) => {
      if (!e.target.value) {
        (async () => {
          await handleSearch(null);
        })();
      }
      changeLocation(e.target.value);
      googleApi(e.target, handleSet);
    },
    [changeLocation, handleSearch, handleSet],
  );

  return (
    <Grid container>
      <Grid item xs={6} sx={{ pl: 2, pr: 2 }} className={classes.myBox}>
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
                setSelectedItem={setSelectedItem}
                key={item.photoUrl + item.address}
                {...item}
              />
            );
          })}
      </Grid>
      <Grid item xs={6} className={classes.mySideBar}>
        <Typography>{isLoading}</Typography>
        <Route path="/flats/:id">
          <FlatMap selectedItem={selectedItem} setIsLoading={setIsLoading} />
        </Route>
      </Grid>
    </Grid>
  );
};

export default FlatExplore;
