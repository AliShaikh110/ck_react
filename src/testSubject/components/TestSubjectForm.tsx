import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Grid,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  TestSchema,
  TestSchemaType,
} from "../../validation/testSeriesSubjectSchema";
import SimpleTextField from "../../GlobalComponent/SimpleTextField";
import FileUpload from "../../GlobalComponent/FileUpload";
import SimpleSelectField, {
  Option,
} from "../../GlobalComponent/SimpleSelectField";

const iconOptions: Option[] = [
  { value: "math", label: "Math Icon" },
  { value: "science", label: "Science Icon" },
  { value: "geometry", label: "Geometry Icon" },
];

const TestSubjectForm = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TestSchemaType>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      name: "",
      slug: null,
      order: 0,
      testSeriesExams: null,
      //   icon: null,
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  const onSubmit = (data: TestSchemaType) => {
    console.log("POST DATA:", data);
  };

  return (
    <Box p={4} borderRadius={2}>
      <Typography variant="h6" mb={3}>
        Create Test Series Category
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* NAME */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SimpleTextField
              name="name"
              control={control}
              label="name"
              rules={{ required: "Name is required" }}
              fullWidth
            />
          </Grid>


          {/* ORDER */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SimpleSelectField
              name="order"
              control={control}
              label="Order"
              options={[
                { value: 0, label: "0" },
                { label: "1", value: 1 },
              ]}
              // isOptionEqualToValue={
              //   watch("order") === 0
              //     ? (a, b) => a.value === b.value
              //     : (a, b) => a.value === b.value
              // }
              noneOption={false}
              // placeholder="Add relation"
              rules={{ required: "Select at least one subject" }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SimpleSelectField
              name="testSeriesExams"
              control={control}
              label="test Series Exams"
              options={[
                { value: 0, label: "0" },
                { label: "1", value: 1 },
              ]}
              noneOption={false}
              rules={{ required: "Select at least one subject" }}
            />
          </Grid>

          {/* isActive (toggle) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setValue("isActive", e.target.checked)}
                />
              }
              label="Is Active"
            />
          </Grid>

          {/* SUBMIT BUTTON */}
          <Grid size={{ xs: 12 }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default TestSubjectForm;
