import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import post1 from '../assets/randomPost1.jpg'
import post2 from '../assets/randomPost2.jpg'
import randomUser from './randomUser.js'
const Stories = () => {
    return (
        <Box h={'fit-content'} px={'1rem'} w={'100%'} className='storiesSection' >

            <Flex gap={'1rem'} w={'fit-content'} >
                {
                    randomUser.map((i, idx) => {
                        return (
                            <Flex w={'5rem'} h={'fit-content'} flexDir={'column'} overflow={'hidden'}>
                                <Box w={'4rem'} h={'4rem'} border={'3px solid green'} borderRadius={'50%'} overflow={'hidden'}>
                                    <Image src={i.picture.large} w={'100%'} objectFit={'cover'} />
                                </Box>
                                <Text color={'black'} noOfLines={'1'}>{i.login.username}</Text>
                            </Flex>
                        )
                    })
                }


            </Flex>
        </Box>
    )
}

export default Stories
