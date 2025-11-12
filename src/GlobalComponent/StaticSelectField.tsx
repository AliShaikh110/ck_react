import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type StaticSimpleFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
};

const StaticSimpleField = <T extends FieldValues>({
  name,
  control,
  label = "Difficulty",
  disabled,
}: StaticSimpleFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            disabled={disabled}
            value={field.value || ""}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  );
};

export default StaticSimpleField;
