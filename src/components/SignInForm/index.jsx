import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../form-controls/InputField";
import PropTypes from "prop-types";
import PasswordField from "../form-controls/PassWordField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function SignInForm({ onSubmit }) {
  // goes schema here for translation - i18n
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please input your email.")
      .email("Must be a valid email."),
    password: yup
      .string()
      .required("Please input your password.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password should meet 8 characters length and contains at least:\n- one upper case letter, \n- one lower case letter, \n- one number, \n- and one special character."
      ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    console.log("Values in Form submit: ", values);
    onSubmit(values);
  };
  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <InputField name="email" label="Email Address" form={form} />
      <PasswordField name="password" label="Password" form={form} />
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      /> */}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/sign-up" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignInForm;
