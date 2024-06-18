// src/pages/ProblemListPage.js
import React from 'react';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { BellIcon, SettingsIcon } from '@chakra-ui/icons';
import SearchBar from '../components/SearchBar';
import ProblemList from '../components/ProblemList';
import UserInfo from '../components/UserInfo';
import './ProblemListPage.css';

const ProblemListPage = () => {
    // Mock user data
    const user = {
        name: 'John Doe',
        achievements: ['Beginner', 'Intermediate'],
        currentExp: 150,
        expToLevelUp: 200,
        coins: 50,
    };

    return (
        <Box className="problem-list-page">
            <Flex className="header" align="center" justify="space-between" p="5px 35px" bg="#1c1c1e" color="white" height="70px">
                <Flex align="center">
                    <Heading size="lg" mr="30px">EPS</Heading>
                    <Flex className="navbar">
                        <Box className="nav-links">
                            <Text as="span" className="nav-item active" mr="30px">Problems</Text>
                            <Text as="span" className="nav-item" mr="30px">Community</Text>
                            <Text as="span" className="nav-item">Competition</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Flex align="center">
                    <SearchBar />
                    <IconButton
                        icon={<BellIcon boxSize={6} />}
                        variant="ghost"
                        colorScheme="whiteAlpha"
                        aria-label="Notifications"
                        ml="20px"
                    />
                    <IconButton
                        icon={<SettingsIcon boxSize={6} />}
                        variant="ghost"
                        colorScheme="whiteAlpha"
                        aria-label="Settings"
                        ml="20px"
                    />
                </Flex>
            </Flex>
            <Flex className="content" flexGrow="1" p="20px 50px" justify="center">
                <Box className="problem-list-section" flex="0 1 60%" p="20px" overflowY="auto" borderRight="1px solid #ddd">
                    <ProblemList />
                </Box>
                <Box className="user-info-section" flex="0 1 20%" p="20px">
                    <UserInfo user={user} />
                </Box>
            </Flex>
        </Box>
    );
};

export default ProblemListPage;