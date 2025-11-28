import { useForm } from 'react-hook-form'
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionSchema } from '../addQeustion/QuestionSchema';
import FormStructure from '../addQeustion/_components/FormStructure';
import { examsSchema, ExamsSchemaType } from '../validation/testSeriesExamSchema';
import TestExamFormStructure from './_components/TestExamFormStructure';

export default function TestExamsFormEdit() {
    const { id } = useParams();
    // console.log('id: ', id);

    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(examsSchema),
        defaultValues: async () => {
            const response = await fetch(`http://localhost:1337/api/t-exams/1?populate[test_series_category][fields][0]=name&populate[test_series_subjects][fields][0]=name&populate[test_series_topics][fields][0]=name`, {
                headers: {
                    'Content-Type': 'application/json',

                    'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_BEARER}`
                }
            });
            // const data = await response.json();
            const { data } = await response.json();
            console.log('data: ', data);
            return ({
                title: data.attributes.title || '',
                slug: data.attributes.slug || null,
                description: data.attributes.description || '',
                test_series_category: data.attributes.test_series_category.data || 0,
                // test_series_questions: 0,
                marking_negative: data.attributes.marking_negative || 0,
                marking_positive: data.attributes.marking_positive || 0,
                timer: data.attributes.timer || 0,
                test_series_subjects: data.attributes.test_series_subjects.data.map((subject: any) => ({ id: subject.id, name: subject.attributes.name })) || [],
                difficulty: "Easy",
                test_series_topics: data.attributes.test_series_topics.data.map((topic: any) => ({ id: topic.id, name: topic.attributes.name })) || [],
            }
            )
        },
    });
    console.log('dfhkjusedfhkdjsfhkjsdfhkjuh', watch())

    // console.log(watch())

    const onSubmitt = (data: ExamsSchemaType) => {
        console.log('data: ', data);

        const url = id
            ? `${import.meta.env.VITE_BASE_URL}t-exams/${id}` // UPDATE
            : `${import.meta.env.VITE_BASE_URL}t-exams`; // CREATE

        const method = id ? "PUT" : "POST";

        const response = fetch(`${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_BEARER}`
            },
            body: JSON.stringify({ data: data }),
        })

        console.log(response)
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await fetch(`http://localhost:1337/api/t-exams/${id}?populate[test_series_category][fields][0]=name&populate[test_series_subjects][fields][0]=name&populate[test_series_topics][fields][0]=name`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',

    //                     'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_BEARER}`
    //                 }
    //             });
    //             const { data } = await response.json();
    //             reset({
    //                 title: data.attributes.title,
    //                 slug: data.attributes.slug,
    //                 description: data.attributes.description,
    //                 test_series_category: data.attributes.test_series_category.data.id,
    //                 marking_negative: data.attributes.marking_negative,
    //                 marking_positive: data.attributes.marking_positive,
    //                 timer: data.attributes.timer,
    //                 test_series_subjects: data.attributes.test_series_subjects.data.map((subject: any) => subject.id),
    //                 difficulty: data.attributes.difficulty,
    //                 test_series_topics: data.attributes.test_series_topics.data.map((topic: any) => topic.id),
    //             });
    //             console.log('data: ', data.attributes.title);

    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    if (isLoading) return <div>Loading...</div>;
    // if (!id) return null;

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmitt)}
        >
            <TestExamFormStructure control={control} setValue={setValue} watch={watch} />
        </Box>
    )
}
