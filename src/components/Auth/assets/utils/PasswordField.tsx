import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useField } from 'formik';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface PropsType {
  label: string;
  name: string;
}

const PasswordField = ({ label, name }: PropsType): ReactJSXElement => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [field, meta] = useField(name);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <TextField
        sx={{ mt: 2 }}
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
        name={name}
        label={label}
        variant="filled"
        onBlur={field.onBlur}
        value={field.value}
        onChange={field.onChange}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </>
  );
};

export default PasswordField;
