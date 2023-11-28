import { Autocomplete, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectField.defaultProps = {
  label: "",
  disabled: false,
};

const jobs = [
  { id: 1, title: "Developer" },
  { id: 2, title: "Designer" },
  { id: 3, title: "Student" },
  { id: 4, title: "Intership" },
  { id: 5, title: "Other" },
];

function SelectField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form.formState;
  const hasError = errors[name];

  return (
    <div>
      <FormControl sx={{ textAlign: "left" }} fullWidth>
        <Controller
          control={form.control}
          name={name}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(event, item) => {
                onChange(item);
              }}
              value={value}
              options={jobs}
              getOptionLabel={(item) => (item.title ? item.title : "")}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title || value === ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  margin="normal"
                  variant="outlined"
                  error={!!hasError}
                  helperText={errors[name]?.message}
                />
              )}
            />
          )}
        />
      </FormControl>
    </div>
  );
}

export default SelectField;
