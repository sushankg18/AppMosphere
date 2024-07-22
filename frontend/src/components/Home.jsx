import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar.jsx'
import PostSection from './PostSection.jsx'
import SuggestionBox from './SuggestionBox.jsx'

const Home = () => {
  return (
    <Box bgColor={'white'} minH={'100vh'}>
      <Navbar />

      <Flex>
        <PostSection />
        <SuggestionBox />
      </Flex>
    </Box>
  )
}

export default Home
