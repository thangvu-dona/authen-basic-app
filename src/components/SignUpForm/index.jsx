import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../form-controls/InputField";
import PropTypes from "prop-types";
import PasswordField from "../form-controls/PassWordField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import SelectField from "../form-controls/SelectField";

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function SignUpForm({ onSubmit }) {
  // goes schema here for translation - i18n
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("Please input First Name")
      .matches(
        /^[a-zA-Z]{3,}$/,
        "First Name must have at least 3 alphabet characters"
      ),
    lastName: yup
      .string()
      .required("Please input Last Name")
      .matches(
        /^[a-zA-Z]{2,}$/,
        "Last Name must have at least 2 alphabet characters"
      ),
    job: yup.object().required("Please input your Job Title."),
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
    retypePassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Password does not match."),
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      job: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (values) => {
    console.log("Values in Form submit: ", values);
    onSubmit(values);
  };
  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(handleFormSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField name="firstName" label="First Name" form={form} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name="lastName" label="Last Name" form={form} />
        </Grid>
        <Grid item xs={12}>
          <SelectField name="job" label="Job Title" form={form} />
        </Grid>
        <Grid item xs={12}>
          <InputField name="email" label="Email Address" form={form} />
        </Grid>
        <Grid item xs={12}>
          <PasswordField name="password" label="Password" form={form} />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            name="retypePassword"
            label="Re-type Password"
            form={form}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid> */}
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/sign-in" variant="body2">
            {"Already have an account? Sign in"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignUpForm;
