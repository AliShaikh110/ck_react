import { useForm } from 'react-hook-form'
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionSchema } from '../addQeustion/QuestionSchema';
import FormStructure from '../addQeustion/_components/FormStructure';

export default function QuestionPreview2() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const { control, setValue, watch, handleSubmit, reset } = useForm({
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

    const onSubmitt = (data) => {
        console.log('submit', data);
        const response = fetch(`https://admin.onlyeducation.co.in/api/t-questions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 396dcb5c356426f8c3ce8303bcdc6feb5ecb1fd4aa4aaa59e42e1c7f82b6385cf4107d023cc58cfd61294adb023993a8e58e0aad8759fbf44fc020c1ac02f492c9d42d1f7dc12fc05c8144fbe80f06850c79d4b823241c83c5e153b03d1f8d0316fb9dec1a531c0df061e1f242bab549f17f715b900ba9546f6a6351fdd7dfa8'
            },
            body: JSON.stringify({ data: data }),
        })
        console.log('response', response);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`https://admin.onlyeducation.co.in/api/t-questions/262?populate[subject_tag][fields][0]=name&populate[test_series_topic][fields][0]=name&populate[options]=true`, {
                    headers: {
                        'Content-Type': 'application/json',

                        'Authorization': `Bearer 396dcb5c356426f8c3ce8303bcdc6feb5ecb1fd4aa4aaa59e42e1c7f82b6385cf4107d023cc58cfd61294adb023993a8e58e0aad8759fbf44fc020c1ac02f492c9d42d1f7dc12fc05c8144fbe80f06850c79d4b823241c83c5e153b03d1f8d0316fb9dec1a531c0df061e1f242bab549f17f715b900ba9546f6a6351fdd7dfa8`
                    }
                });
                console.log('response: ', await response.json());
                const { data } = await response.json();
                console.log('data12: ', data);

                reset(data.attributes);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    // if (!id) return null;

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmitt)}
        >
            <FormStructure control={control} setValue={setValue} watch={watch} />
        </Box>
    )
}
