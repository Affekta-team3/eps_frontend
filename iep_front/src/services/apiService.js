// src/services/apiService.js

import axios from 'axios';

// Define the base URL of your API
const BASE_URL = 'https://team3-webapp-eps.azurewebsites.net/api'; // Replace with your actual backend URL

const parseResponseData = (data) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Error parsing response data:', error);
            throw error;
        }
    }
    return data;
};


// Fetch a list of all problems
export const fetchProblems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/problems`);
        return response.data;
    } catch (error) {
        console.error('Error fetching problems:', error);
        throw error;
    }
};

// Fetch details of a specific problem
export const fetchProblemDetails = async (problemId) => {
    try {
        const response = await axios.get(`${BASE_URL}/problems/${problemId}`);
        return parseResponseData(response.data);
    } catch (error) {
        console.error('Error fetching problem details:', error);
        throw error;
    }
};

// Submit a solution for a problem
export const submitSolution = async (submission) => {
    try {
        const response = await axios.post(`${BASE_URL}/submissions`, submission);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error submitting solution:', error);
        throw error;
    }
};

// Evaluate the submitted code
export const evaluateSolution = async (submission) => {
    try {
        const response = await axios.post(`${BASE_URL}/evaluate`, submission);
        return response.data;
    } catch (error) {
        console.error('Error evaluating solution:', error);
        throw error;
    }
};

// Get the status of a specific submission
export const fetchSubmissionStatus = async (submissionId) => {
    try {
        const response = await axios.get(`${BASE_URL}/submissions/${submissionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching submission status:', error);
        throw error;
    }
};

// Add other functions as needed