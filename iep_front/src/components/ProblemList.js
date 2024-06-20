// src/components/ProblemList.js

import React, { useEffect, useState } from 'react';
import {Box, Text, Skeleton, VStack, SkeletonText} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { fetchProblems } from '../services/apiService';
import ProblemCard from './ProblemCard';
import './ProblemList.css';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    useEffect(() => {
        const getProblems = async () => {
            try {
                const problems = await fetchProblems();
                setProblems(problems);
            } catch (error) {
                console.error('Error fetching problems:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        getProblems();
    }, []);

    return (
        <VStack spacing={4} align="stretch">
            {loading ? (
                // Display skeletons while loading
                <>
                    {[...Array(3)].map((_, index) => (
                        <Box
                            key={index}
                            p={4}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            bg="white"
                            boxShadow="md"
                        >
                            <Skeleton height="20px" width="60%" />
                            <SkeletonText mt="4" noOfLines={2} spacing="4" />
                        </Box>
                    ))}
                </>
            ) : (
                // Display problem cards when data is loaded
                problems.map((problem) => (
                    <ProblemCard key={problem.problem_id} problem={problem} />
                ))
            )}
        </VStack>
    );
};

export default ProblemList;
