// src/services/mockService.js

const mockProblems = [
    {
        problemId: "1",
        title: "Two Sum",
        description: "Find two numbers that add up to a specific target.",
        inputFormat: "Array of integers",
        outputFormat: "Indices of the two numbers",
        samples: ["[2, 7, 11, 15], target = 9"],
        difficulty: "Easy"
    },
    {
        problemId: "2",
        title: "Add Two Numbers",
        description: "Add two numbers represented by linked lists.",
        inputFormat: "Two linked lists",
        outputFormat: "A linked list",
        samples: ["(2 -> 4 -> 3) + (5 -> 6 -> 4)"],
        difficulty: "Medium"
    }
];

const mockSubmissions = [
    {
        submissionId: "1",
        status: "Accepted",
        result: "Success",
        runtime: "1ms",
        memory: "10MB"
    }
];

export const fetchProblems = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockProblems), 500); // Simulate network delay
    });
};

export const fetchProblemDetails = async (problemId) => {
    return new Promise((resolve) => {
        const problem = mockProblems.find(p => p.problemId === problemId);
        setTimeout(() => resolve(problem), 500); // Simulate network delay
    });
};

export const submitSolution = async (submission) => {
    return new Promise((resolve) => {
        const newSubmission = {
            submissionId: "2",
            status: "Accepted",
            result: "Success",
            runtime: "2ms",
            memory: "12MB"
        };
        mockSubmissions.push(newSubmission);
        setTimeout(() => resolve(newSubmission), 500); // Simulate network delay
    });
};

// Add other mock functions as needed