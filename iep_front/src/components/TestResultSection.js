// src/components/TestResultSection.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const TestResultSection = ({ result }) => {
    return (
        <Box p="20px" bg="white" borderRadius="8px" mb="20px">
            <Heading as="h3" size="lg" mb="10px">Test Result</Heading>
            <Text fontSize="md" mb="10px">{result}</Text>
        </Box>
    );
};

export default TestResultSection;