import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleSelectField, {
  Option,
} from "../../GlobalComponent/SimpleSelectField";
import {
  Control,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { QuestionSchemaType } from "../QuestionSchema";
import SimpleTextField from "../../GlobalComponent/SimpleTextField";
import MainEditor from "../components/MainEditor";
import OptionsFieldArray from "../components/OptionsFieldArray";
import {
  difficultyOptions,
  dummySubject,
  dummyTopics,
  optionTypeData,
  optionLabel
} from "./data";
import useInitialDataContext from "./InitalContext";
import { useEffect, useState } from "react";
import TopicsPage from "../../GlobalComponent/TopicsPage";
import TopicSearchBar from "../../components/TopicSearchBar";
import UseMeiliDataContext from "../../context/MeiliContext";
import SimpleMultiAutoComplete from "../../GlobalComponent/SimpleMultiAutoComplete";
import { SingleSelectAuto } from "../../GlobalComponent/SingleSelectAuto";

export default function FormStructure({
  control,
  watch,
  setValue,
}: {
  control: Control<QuestionSchemaType>;
  watch: UseFormWatch<QuestionSchemaType>;
  setValue: UseFormSetValue<QuestionSchemaType>;
}) {
  const {
    data,
    deleteDropItem
  } = UseMeiliDataContext()


  const deleteData = (id: number, type: any) => {
    deleteDropItem(id, type)
  }

  const topics = data.topicData || [];
  const subjects = data.subjectData || [];


  const subjectOptions = subjects
    .filter((s) => typeof s.id === "number") // keep only items with id
    .map((s) => ({
      value: s.id as number,
      label: s.title || s.name || s.slug || "",
    }));

  return (
    <Grid
      container
      spacing={3}
      sx={{ marginBlockStart: 10, paddingInline: 3, paddingBlockEnd: 5 }}
    >
      <Grid container size={12}>
        <Typography variant="h4">Question Form</Typography>
      </Grid>
      {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Typography variant="subtitle1">Select subject</Typography>
        <SimpleSelectField
          label=""
          name="subject_tag"
          control={control}
          // label="Select Subject"
          options={
            subjectTagData?.map((subject) => ({
              value: subject.id,
              label: subject.attributes.name,
            })) as Option[]
          }
          rules={{ required: "Please select a subject" }}
        />
      </Grid> */}

      <Grid>
        <TopicSearchBar routeName="test-series-subject" typeName="subjectData" dropdownType="single" />
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            Selected topics
          </Typography>

          {subjects.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No topics added yet. Start searching and selecting from the dropdown.
            </Typography>
          ) : (
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 2,
                maxHeight: 240,
                overflowY: "auto",
              }}
            >
              <List dense disablePadding>
                {subjects.map((d, index) => (
                  <ListItem
                    key={d.id ?? index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => deleteData(d.id as number, "subjectData")}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={d.title || d.name || d.slug || "Untitled topic"}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Typography variant="subtitle1">
          Select subject
        </Typography>

        {/* <SimpleSelectField
          control={control}
          name='subject_tag'
          options={
            subjects?.map((subject) => ({
              value: subject.id,
              label: subject.title,
            })) as Option[]
          }
        /> */}

        <SingleSelectAuto
          name="subject_tag"
          control={control}
          label="Select Exam"
          options={subjectOptions}
          externalValue={subjectOptions[0]?.value}
        />

      </Grid>

      <Grid>
        <TopicSearchBar routeName="t-topic" typeName="topicData" dropdownType="multi" />
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            Selected topics
          </Typography>

          {topics.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No topics added yet. Start searching and selecting from the dropdown.
            </Typography>
          ) : (
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 2,
                maxHeight: 240,
                overflowY: "auto",
              }}
            >
              <List dense disablePadding>
                {topics.map((d, index) => (
                  <ListItem
                    key={d.id ?? index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => deleteData(d.id as number, "topicData")}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={d.title || d.name || d.slug || "Untitled topic"}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Grid>
      {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>        
        <Typography variant="subtitle1">Select topic</Typography>
        <SimpleSelectField
          label=""
          name="test_series_topic"
          control={control}
          options={
            topicTagData?.map((topic) => ({
              value: topic.id,
              label: topic.attributes.name,
            })) as Option[]
          }
          rules={{ required: "Please select a Topic" }}
          disabled={watch("subject_tag") == 0 ? true : false}
        />
      </Grid> */}
      {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Typography variant="subtitle1">Select Exams</Typography>
        <SimpleSelectField
          label=""
          name="test_series_exams"
          control={control}
          options={
            tExamsData?.map((exam) => ({
              value: exam.id,
              label: exam.attributes.title,
            })) as Option[]
          }
          rules={{ required: "Please select a Topic" }}
        />
      </Grid> */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        {/* <SimpleSelectField /> */}
        <Typography variant="subtitle1">Marks</Typography>
        <SimpleTextField
          name="marks"
          control={control}
          // label="Marks"
          type="number"
          placeholder="Enter marks"
          rules={{ min: { value: 1, message: "Marks must be at least 1" } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        {/* <SimpleSelectField /> */}
        <Typography variant="subtitle1">Difficulty</Typography>
        <SimpleSelectField
          label=""
          name="difficulty"
          control={control}
          // label="Test Series Topic"
          options={difficultyOptions}
          rules={{ required: "Please select a Topic" }}
        />
      </Grid>
      {/* <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <Typography variant="subtitle1">Option type</Typography>
        <SimpleSelectField
          label=""
          name="option_type"
          control={control}
          // label="Test Series Topic"
          options={optionTypeData}
          rules={{ required: "Please select a Topic" }}
          noneOption={false}
        />
      </Grid> */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        {/* <SimpleSelectField /> */}
        <Typography variant="subtitle1">Hint</Typography>
        <SimpleTextField
          name="hint"
          control={control}
          // label="Test Series Topic"
          // options={difficultyOptions}
          rules={{ required: "Please select a Topic" }}
        />
      </Grid>
      {/* <Grid container size={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1">Question Title</Typography>
          <MainEditor
            name="question_title"
            value={watch("question_title")}
            setValue={setValue}
            watch={watch}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1">Explaination</Typography>
          <MainEditor
            name="explanation"
            value={watch("explanation")}
            setValue={setValue}
            watch={watch}
          />
        </Grid>
      </Grid> */}
      {/* <Grid size={12}>
        <OptionsFieldArray
          watch={watch}
          control={control}
          setValue={setValue}
        />
      </Grid> */}

      <Grid size={12} sx={{ textAlign: "center", paddingBlock: 2 }}>
        <Button variant="contained" type="submit" sx={{ paddingInline: 10 }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
