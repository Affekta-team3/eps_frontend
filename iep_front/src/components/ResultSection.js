// src/components/ResultSection.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const ResultSection = ({ result }) => {
    const resultLines = result.split('\n');
    const resultObj = resultLines.reduce((acc, line) => {
        const [key, value] = line.split(':');
        if (key && value) {
            acc[key.trim()] = value.trim();
        }
        return acc;
    }, {});

    return (
        <Box p="20px" bg="white" borderRadius="8px" mb="20px">
            <Heading as="h3" size="lg" mb="10px">Full Result</Heading>
            <Text fontSize="md" mb="10px">Status: {resultObj.Status}</Text>
            <Text fontSize="md" mb="10px">Runtime: {resultObj.Runtime}</Text>
            <Text fontSize="md" mb="10px">Memory: {resultObj.Memory}</Text>
            <Text fontSize="md" mb="10px">{result}</Text> {/* This line will display the raw response in case of failure */}
        </Box>
    );
};

export default ResultSection;