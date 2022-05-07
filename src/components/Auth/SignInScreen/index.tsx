import React, { useContext } from 'react';
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import { useFormik } from 'formik';
import { UIContext } from '../../Unknown/UIContext';
import { validationSignInSchema } from '../validators/validators';
import useStyles from '../styles/styles';

const SignInScreen: React.FC = () => {
  const classes = useStyles();
  const firebase = useFirebaseApp();
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSignInSchema,
    onSubmit: async (values) => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
      } catch (error) {
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3">Login</Typography>
      </Box>
      <Container maxWidth="xs" sx={{ mt: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            InputLabelProps={{ shrink: true }}
            InputProps={{ disableUnderline: true }}
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="filled"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ mt: 5 }}
            type={showPassword ? 'text' : 'password'}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
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
              ),
            }}
            fullWidth
            id="password"
            name="password"
            label="Password"
            variant="filled"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ mt: 5 }}
            variant="contained"
          >
            Login
          </Button>
        </form>
      </Container>
      <Box sx={{ mb: 2 }} className={classes.myBox}>
        <Typography sx={{ mb: 2 }} variant="h5">
          Don’t have an account?
        </Typography>
        <Button component={RouterLink} to="/register">
          REGISTER
        </Button>
      </Box>
    </>
  );
};

export default SignInScreen;
