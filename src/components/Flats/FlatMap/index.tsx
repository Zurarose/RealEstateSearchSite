import React, { useCallback, useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useParams } from 'react-router-dom';
import useStyles from './styles/styles';
import getFlat from '../../../common/getFlat';
import { UIContext } from '../../Unknown/UIContext';
import { ISelectedItem } from './types/types';

interface PropsType {
  setIsLoading: (isLoading: string) => void;
  selectedItem: ISelectedItem;
}

const FlatMap = ({
  setIsLoading,
  selectedItem,
}: PropsType): ReactJSXElement => {
  const { setAlert } = useContext(UIContext);
  const classes = useStyles();
  const { id } = useParams<{ id?: string }>();

  const renderMap = useCallback(
    (latitude: number, longitude: number) => {
      setIsLoading('Loading flat details...');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { google } = window;
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: latitude, lng: longitude },
          zoom: 13,
          mapTypeControl: false,
          disableDefaultUI: true,
        },
      );
      const marker = new google.maps.Marker({
        map,
        position: { lat: latitude, lng: longitude },
      });
      setIsLoading('No flat selected');
    },
    [setIsLoading],
  );
  useEffect(() => {
    if (!selectedItem.latitude || !selectedItem.longitude) {
      if (id) {
        try {
          (async () => {
            const flat = await getFlat(id, alert);
            if (flat) {
              renderMap(flat.latitude, flat.longitude);
            } else setIsLoading('Failed to load the flat');
          })();
        } catch (error) {
          setAlert({
            show: true,
            severity: 'error',
            message: error.message,
          });
        }
      }
    } else if (selectedItem.latitude && selectedItem.longitude) {
      try {
        renderMap(selectedItem.latitude, selectedItem.longitude);
      } catch {
        setIsLoading('Failed to load the flat');
      }
    } else setIsLoading('Failed to load the flat');
  }, [
    id,
    renderMap,
    selectedItem.latitude,
    selectedItem.longitude,
    setAlert,
    setIsLoading,
  ]);

  return <Box className={classes.myBox} id="map" />;
};

export default FlatMap;
