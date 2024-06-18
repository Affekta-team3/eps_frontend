// src/components/SearchBar.js
import React from 'react';
import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
    return (
        <InputGroup>

            <Input
                type="text"
                placeholder="Search..."
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: 'gray.500' }}
                _focus={{ borderColor: 'gray.500' }}
            />
        </InputGroup>
    );
};

export default SearchBar;