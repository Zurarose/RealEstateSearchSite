import React, { useContext } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useFirebaseApp } from 'reactfire';
import { useFormik } from 'formik';
import * as yup from 'yup';
import vaypostLogo from '../../images/vaypostLogo.svg';
import { UIContext } from '../../../Unknown/UIContext';

const useStyles = makeStyles({
  typography: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '40px',
    letterSpacing: '-1.5px',
  },
  paragraph: {
    textAlign: 'center',
    fontWeight: 600,
    letterSpacing: '-1.5px',
  },
  link: {
    textAlign: 'center',
    textDecoration: 'none',
    color: '#F50057',
    fontWeight: 500,
    letterSpacing: '0.46px',
  },
  box: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

const validation = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn: React.FC = () => {
  const classes = useStyles();
  const firebase = useFirebaseApp();
  const { setAlert } = useContext(UIContext);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
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
        <img alt="complex" src={vaypostLogo} />
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography className={classes.typography}>Login</Typography>
      </Box>
      <Box sx={{ mt: 5, width: '55%' }}>
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
      </Box>
      <Box sx={{ mb: 2 }} className={classes.box}>
        <Typography sx={{ mb: 2 }} className={classes.paragraph}>
          Don’t have an account?
        </Typography>
        <Link className={classes.link} to="/register">
          REGISTER
        </Link>
      </Box>
    </>
  );
};

export default SignIn;
