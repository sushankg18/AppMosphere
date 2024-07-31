import { Box, Circle, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import post1 from '../assets/randomPost1.jpg'
import post2 from '../assets/randomPost2.jpg'
import randomUser from './randomUser.js'
import { useSelector } from 'react-redux'
const Stories = () => {
    const {otherUsers} = useSelector(store => store.user);
    if(!otherUsers) return ;

    return (
        <Box h={'fit-content'} px={'1rem'} w={'100%'} className='storiesSection' >

            <Flex gap={'1rem'} w={'fit-content'} >
                {
                    otherUsers.map((i, idx) => {
                        return (
                            <Flex w={'5rem'} h={'fit-content'} flexDir={'column'} overflow={'hidden'}>
                                <Circle w={'4rem'} h={'4rem'} border={'2px solid black'}  overflow={'hidden'}>
                                    <Image src={i.profilePhoto} w={'100%'} objectFit={'cover'} />
                                </Circle>
                                <Text color={'black'} noOfLines={'1'}>{i.username}</Text>
                            </Flex>
                        )
                    })
                }


            </Flex>
        </Box>
    )
}

export default Stories
