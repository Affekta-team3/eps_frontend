// src/components/ProblemDetails.js
import React, { useEffect, useState } from 'react';
import { fetchProblemDetails } from '../services/apiService';
import { Box, Heading, Text } from '@chakra-ui/react';

const ProblemDetails = ({ problemId }) => {
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const getProblemDetails = async () => {
            const details = await fetchProblemDetails(problemId);
            setProblem(details);
        };
        getProblemDetails();
    }, [problemId]);

    if (!problem) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            <Heading as="h2" size="lg" mb="10px">{problem.title}</Heading>
            <Text fontSize="md" mb="10px">{problem.description}</Text>
            <Heading as="h3" size="md" mt="20px" mb="10px">Input Format:</Heading>
            <Text fontSize="md" mb="10px">{problem.input_format}</Text>
            <Heading as="h3" size="md" mt="20px" mb="10px">Output Format:</Heading>
            <Text fontSize="md" mb="10px">{problem.output_format}</Text>
            <Heading as="h3" size="md" mt="20px" mb="10px">Difficulty:</Heading>
            <Text fontSize="md" mb="10px">{problem.difficulty}</Text>
        </Box>
    );
};

export default ProblemDetails;