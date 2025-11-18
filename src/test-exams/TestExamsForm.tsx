import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import TestExamFormStructure from "./_components/TestExamFormStructure";
import { QuestionSchema } from "../addQeustion/QuestionSchema";
import { examsSchema } from "../validation/testSeriesExamSchema";
import { zodResolver } from "@hookform/resolvers/zod";


export default function TestExamsForm() {
    const {
        control,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            slug: null,
            description: '',
            test_series_category: 0,
            // test_series_questions: 0,
            marking_negative: 0,
            marking_positive: 0,
            timer: 0,
            test_series_subjects: 0,
            difficulty: "easy",
            test_series_topics: 0,
        },
        resolver: zodResolver(examsSchema),
    });

    const onSubmitt = async (data: any) => {
        console.log("submit", data);
        // const payload = {
        //     data: data
        // };
        // console.log('payload: ', payload);
        const response = await fetch(
            "https://admin.onlyeducation.co.in/api/t-exam",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer 396dcb5c356426f8c3ce8303bcdc6feb5ecb1fd4aa4aaa59e42e1c7f82b6385cf4107d023cc58cfd61294adb023993a8e58e0aad8759fbf44fc020c1ac02f492c9d42d1f7dc12fc05c8144fbe80f06850c79d4b823241c83c5e153b03d1f8d0316fb9dec1a531c0df061e1f242bab549f17f715b900ba9546f6a6351fdd7dfa8",
                },
                body: JSON.stringify({ data: data }),
            }
        );
        const datas = await response.json();
        console.log("response", datas);
    };
    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmitt)}
        >
            <TestExamFormStructure control={control} setValue={setValue} watch={watch} />
        </Box>
    );
}
