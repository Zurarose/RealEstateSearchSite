import React, { useContext } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import { Formik, FormikProps } from 'formik';
import { UIContext } from '../../Unknown/UIContext';
import { validationSignUpSchema } from '../validators/validators';
import useStyles from '../styles/styles';
import PasswordField from '../assets/utils/PasswordField';

interface FormValues {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

const SignUpScreen: React.FC = () => {
  const classes = useStyles();
  const firebase = useFirebaseApp();
  const { setAlert } = useContext(UIContext);
  return (
    <Formik
      initialValues={{ email: '', name: '', password: '', repeatPassword: '' }}
      validationSchema={validationSignUpSchema}
      onSubmit={async (values) => {
        try {
          const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password);
          if (result.user) {
            await result.user.updateProfile({
              displayName: values.name,
            });
          } else throw new Error('Failed to create user');
          setAlert({
            show: true,
            snackType: 'snack',
            message: 'Welcome on board 🚀',
          });
        } catch (error) {
          setAlert({
            show: true,
            severity: 'error',
            message: error.message,
          });
        }
      }}
    >
      {(props: FormikProps<FormValues>) => (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h3">Register</Typography>
          </Box>
          <Container maxWidth="xs" sx={{ mt: 4 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.handleSubmit(e);
              }}
            >
              <TextField
                InputLabelProps={{ shrink: true }}
                InputProps={{ disableUnderline: true }}
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="filled"
                onBlur={props.handleBlur}
                value={props.values.email}
                onChange={props.handleChange}
                error={props.touched.email && Boolean(props.errors.email)}
                helperText={props.touched.email && props.errors.email}
              />
              <TextField
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{ disableUnderline: true }}
                fullWidth
                id="name"
                name="name"
                label="Full name"
                variant="filled"
                onBlur={props.handleBlur}
                value={props.values.name}
                onChange={props.handleChange}
                error={props.touched.name && Boolean(props.errors.name)}
                helperText={props.touched.name && props.errors.name}
              />
              <PasswordField name="password" label="Password" />
              <PasswordField name="repeatPassword" label="Repeat password" />
              <Button
                fullWidth
                disabled={props.isSubmitting}
                type="submit"
                sx={{ mt: 2 }}
                variant="contained"
              >
                REGISTER
              </Button>
            </form>
          </Container>
          <Box sx={{ mb: 2 }} className={classes.myBox}>
            <Typography sx={{ mb: 2 }} variant="h5">
              Already have account?
            </Typography>
            <Button component={RouterLink} to="/login">
              LOGIN
            </Button>
          </Box>
        </>
      )}
    </Formik>
  );
};

export default SignUpScreen;
