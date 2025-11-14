import { Box, Button, Grid, Typography } from '@mui/material'
import SimpleSelectField, { Option } from '../../GlobalComponent/SimpleSelectField'
import { Control, useFieldArray, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { QuestionSchemaType } from '../QuestionSchema'
import SimpleTextField from '../../GlobalComponent/SimpleTextField'
import MainEditor from '../components/MainEditor'
import OptionsFieldArray from '../components/OptionsFieldArray'
import { difficultyOptions, dummySubject, dummyTopics } from './data'
import { useContext } from 'react'
import useInitialDataContext from './InitalContext'

export default function FormStructure({
    control,
    watch,
    setValue
}: {
    control: Control<QuestionSchemaType>;
    watch: UseFormWatch<QuestionSchemaType>;
    setValue: UseFormSetValue<QuestionSchemaType>
}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });
    const { subjectTagData, topicTagData } = useInitialDataContext();

    return (
        <Grid
            container
            sx={{ marginBlockStart: 10, paddingInline: 3 }}
        >
            <Grid size={12}>
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
                {/* <MainEditor
          name="question_title"
          value={watch("question_title")}
          setValue={setValue}
          watch={watch}
        /> */}
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
            <Grid size={12}>
                <OptionsFieldArray
                    watch={watch}
                    control={control}
                    setValue={setValue}
                />
            </Grid>
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </Grid>
    )
}
