import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {
  Box,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useFirebaseApp } from 'reactfire';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UIContext } from '../../Unknown/UIContext';
import signInImage from '../../../assets/images/SignInScreenImages/signInImage.png';
import vaypostLogo from '../../../assets/images/SignInScreenImages/vaypostLogo.png';
import './sighInScreen.css';

const SignInScreen: React.FC = () => {
  const firebase = useFirebaseApp();
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = React.useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        setDisabled(true);
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        setDisabled(false);
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      }
    },
    [email, firebase, password, setAlert],
  );
  return (
    <>
      <Grid container>
        <Grid item xs={6} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <img id="halfPageImage" alt="complex" src={signInImage} />
        </Grid>
        <Grid
          display="flex"
          width="100%"
          flexDirection="column"
          alignItems="center"
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Box sx={{ mt: 5 }}>
            <img alt="complex" src={vaypostLogo} />
          </Box>
          <Box sx={{ mt: 5 }}>
            <p>Login</p>
          </Box>
          <Box sx={{ mt: 5, width: '55%' }}>
            <form onSubmit={handleSignIn}>
              <FormControl required fullWidth variant="filled">
                <InputLabel
                  required={false}
                  shrink
                  htmlFor="filled-adornment-password"
                >
                  Email
                </InputLabel>
                <FilledInput
                  type="email"
                  disableUnderline
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl required sx={{ mt: 5 }} fullWidth variant="filled">
                <InputLabel
                  required={false}
                  shrink
                  htmlFor="filled-adornment-password"
                >
                  Password
                </InputLabel>
                <FilledInput
                  disableUnderline
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ mt: 2 }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                disabled={disabled}
                type="submit"
                sx={{ mt: 5, width: '100%' }}
                variant="contained"
              >
                Login
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignInScreen;
