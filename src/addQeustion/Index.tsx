import React from "react";
import MainEditor from "./components/MainEditor";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import SimpleSelectField, {
  Option,
} from "../GlobalComponent/SimpleSelectField";
import { useFieldArray, useForm } from "react-hook-form";
import { QuestionSchema } from "./QuestionSchema";
// import Typography from "@mui/material/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleTextField from "../GlobalComponent/SimpleTextField";

const dummySubject = [
  { id: 7, title: "chemistry" },
  { id: 5, title: "amthematics" },
  { id: 6, title: "physics" },
];

export const dummyTopics = [
  { id: 147, title: "Electrochemistry" },
  { id: 148, title: "Acid-Base Equilibria" },
  { id: 149, title: "Thermodynamics" },
  { id: 150, title: "Thermochemistry" },
  { id: 151, title: "Qualitative Analysis" },
  { id: 152, title: "Organic Named Reactions" },
  { id: 153, title: "Organic Qualitative Analysis" },
  { id: 116, title: "Polynomials" },
  { id: 117, title: "Probability" },
  { id: 118, title: "Differentiability" },
  { id: 119, title: "Matrices" },
  { id: 120, title: "3D Geometry" },
  { id: 121, title: "Functions" },
];
const difficultyOptions = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];
export const optionLabelOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
];
export default function Index() {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      subject_tag: 0,
      test_series_topic: 0,
      test_series_exams: [],
      marks: 0,
      difficulty: "easy",
      explanation: "",
      option_type: "input_box",
      options: [{ option_label: "A", option: "", is_correct: false }],
    },
    resolver: zodResolver(QuestionSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  console.log("watch: ", watch());

  return (
    <Grid container sx={{ marginBlockStart: 10, paddingInline: 3 }}>
      <Grid size={12}>
        {/* <SimpleSelectField /> */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            subject tag
          </Typography>
          <SimpleSelectField
            name="subject_tag"
            control={control}
            label="Select Subject"
            options={
              dummySubject.map((s) => ({
                value: s.id.toString(),
                label: s.title,
              })) as Option[]
            }
            rules={{ required: "Please select a subject" }}
          />
        </Box>
      </Grid>
      <Grid size={12}>
        {/* <SimpleSelectField /> */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          test series topic
        </Typography>
        <SimpleSelectField
          name="test_series_topic"
          control={control}
          label="Test Series Topic"
          options={
            dummyTopics.map((s) => ({
              value: s.id.toString(),
              label: s.title,
            })) as Option[]
          }
          rules={{ required: "Please select a Topic" }}
        />
      </Grid>
      <Grid size={12}>
        {/* <SimpleSelectField /> */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          marks
        </Typography>
        <SimpleTextField
          name="marks"
          control={control}
          label="Marks"
          type="number"
          placeholder="Enter marks"
          rules={{ min: { value: 1, message: "Marks must be at least 1" } }}
        />
      </Grid>
      <Grid size={12}>
        {/* <SimpleSelectField /> */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          difficulty
        </Typography>
        <SimpleSelectField
          name="difficulty"
          control={control}
          label="Test Series Topic"
          options={difficultyOptions}
          rules={{ required: "Please select a Topic" }}
        />
      </Grid>
      <Grid size={12}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Question Title
          </Typography>
        </Box>
        <MainEditor
          name="question_title"
          value={watch("question_title")}
          setValue={setValue}
          watch={watch}
        />
      </Grid>
      <Grid size={12}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="h5"
            className="text-xl"
          >{`2) Question Explaination`}</Typography>
          <MainEditor
            name="explanation"
            value={watch("explanation")}
            setValue={setValue}
            watch={watch}
          />
        </Box>
      </Grid>
      <Grid size={12} sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="h5"
            className="text-xl"
          >{`3) Options`}</Typography>
        </Box>
      </Grid>
      
    </Grid>
  );
}
