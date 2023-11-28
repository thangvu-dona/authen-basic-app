import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  label: "",
  disabled: false,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form.formState;
  const hasError = errors[name];

  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          // {name, value, onChange, onBlur} = field
          <TextField
            {...field}
            id={name}
            label={label}
            margin="normal"
            variant="outlined"
            fullWidth
            disabled={disabled}
            error={!!hasError} // style helperText type 'error' - red color
            helperText={errors[name]?.message}
          />
        )}
      />
    </div>
  );
}

export default InputField;
