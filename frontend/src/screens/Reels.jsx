import { Box, Center, Flex } from '@chakra-ui/react'
import React from 'react'
import HomeUserProfile from '../components/HomeUserProfile.jsx'
import ReelsSection from '../components/ReelsSection.jsx'

const Reels = () => {
    return (
        <Box overflowY={'hidden'} maxH={'90vh'}>
            <Flex justifyContent={'space-between'} p={'1rem 1rem'}>
                <HomeUserProfile />
                <ReelsSection />
            </Flex>
        </Box>
    )
}

export default Reels
