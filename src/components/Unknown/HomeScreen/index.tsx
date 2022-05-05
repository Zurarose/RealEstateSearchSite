import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { useUser, useFirebaseApp } from 'reactfire';
import { useContext } from 'react';
import { UIContext } from '../UIContext';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  let shortName: string;
  if (name.split(' ').length > 1) {
    shortName = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  } else {
    shortName = `${name.split(' ')[0][0]}`;
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: shortName,
  };
}

const HomeScreen: React.FC = () => {
  const { data: user } = useUser();
  const firebase = useFirebaseApp();
  const { setAlert } = useContext(UIContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = React.useCallback(async () => {
    try {
      await firebase.auth().signOut();
      clearFirestoreCache();
    } catch (error) {
      setAlert({
        show: true,
        severity: 'error',
        message: error.message,
      });
    }
  }, [firebase, setAlert]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vaypost
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user.displayName ? (
                <Avatar {...stringAvatar(user.displayName)} />
              ) : (
                <Avatar {...stringAvatar('U')} />
              )}
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleSignOut} textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeScreen;
