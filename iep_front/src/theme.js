// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontFamily: 'Arial, sans-serif',
                lineHeight: '1.6',
            },
            a: {
                color: 'inherit',
                textDecoration: 'none',
            },
        },
    },
});

export default theme;