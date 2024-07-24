import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import PostSection from './PostSection.jsx'
import SuggestionBox from './SuggestionBox.jsx'
import { getOtherUsers } from '../hooks/getOtherUsers.jsx'
const Home = () => {
 
  return (
    <Box bgColor={'white'} minH={'100vh'}>
      <Navbar />

      <Flex justifyContent={'space-between'} p={'1rem 1rem'}>
        <SuggestionBox />
        <PostSection />
        <SuggestionBox />
      </Flex>
    </Box>
  )
}

export default Home
