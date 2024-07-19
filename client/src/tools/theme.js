import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // bg: '#1e1f23',
        // bgImage: url('https://bogatyr.club/uploads/posts/2023-03/1679113607_bogatyr-club-p-kukhnya-nochyu-fon-foni-pinterest-61.jpg'),
        color: '#f8f9fb',
      },
      a: {
        color: '#f8f9fb',
        _hover: {
          textDecoration: 'underline',
        },
      },
      h1: {
        color: '#f8f9fb',
      },
      h2: {
        color: '#f8f9fb',
      },
      p: {
        color: '#f8f9fb',
      },
    },
  },
});

export default theme;
