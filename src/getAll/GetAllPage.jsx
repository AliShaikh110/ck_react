import React, { useEffect, useState } from "react";
import { fetchQuestions } from "./fetchQuestions";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// import { Link } from 'react-router-dom'

export default function GetAllList() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const res = await fetchQuestions(1, 10);
            if (res && res.data) {
                console.log('res: ', res);
                setQuestions(res.data);
            }
            setLoading(false);
        }

        loadData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Container>
            <Box sx={{ paddingBlockStart: 10 }}>
                <Typography variant="h4" gutterBottom sx={{ paddingBlockEnd: 3 }}>All Questions</Typography>
                <Grid container spacing={3}>
                    {questions.map((q) => (
                        <Grid component={Link} to={`/edit/${q.id}`} size={4} key={q.id} className="p-3 bg-blue-500 flex items-center justify-start text-white rounded-xl">
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{q.id || "Untitled"}</Typography><br />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
