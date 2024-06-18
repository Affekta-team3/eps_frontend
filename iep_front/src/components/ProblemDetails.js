// src/components/ProblemDetails.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, SkeletonText } from '@chakra-ui/react';
import { fetchProblemDetails } from '../services/apiService';

const ProblemDetails = ({ problemId }) => {
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const getProblemDetails = async () => {
            try {
                const details = await fetchProblemDetails(problemId);
                setProblem(details);
            } catch (error) {
                console.error('Error fetching problem details:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        getProblemDetails();
    }, [problemId]);

    if (loading) {
        return (
            <Box padding="6" bg="white">
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
        );
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
