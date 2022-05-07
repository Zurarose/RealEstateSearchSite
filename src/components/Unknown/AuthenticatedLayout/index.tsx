import { Box } from '@mui/material';
import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useFirebaseApp, useUser } from 'reactfire';
import stringAvatar from '../../../common/stringAvatar';
import { UIContext } from '../UIContext';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}: AuthenticatedLayoutProps) => {
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
      <AppBar position="sticky">
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
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, bgcolor: 'grey' }}
            >
              <Avatar>
                <Typography>{stringAvatar(user.displayName)}</Typography>
              </Avatar>
            </IconButton>
            <Menu
              sx={{ mt: 4 }}
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
      {children}
    </Box>
  );
};

export default AuthenticatedLayout;
