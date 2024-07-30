import { Box, Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import PostSection from './PostSection.jsx'
import SuggestionBox from './SuggestionBox.jsx'
import { getOtherUsers } from '../hooks/getOtherUsers.jsx'
import HomeUserProfile from './HomeUserProfile.jsx'
const Home = () => {
 
  return (
    <Box bgColor={'white'} overflowY={'hidden'} maxH={'100vh'}>
      <Navbar />
    
      <Flex justifyContent={'space-between'} p={'1rem 1rem'}>
        <HomeUserProfile />
        <PostSection />
        <SuggestionBox />
      </Flex>
    </Box>
  )
}

export default Home
