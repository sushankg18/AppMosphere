import { Box, Circle, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
const Stories = () => {
    const {otherUsers} = useSelector(store => store.user);
    if(!otherUsers) return ;

    return (
        <Box h={'fit-content'}fontWeight={'bold'} px={'1rem'} w={'100%'} >

            <Flex gap={'1rem'} overflowX={'scroll'}  w={'fit-content'}>
                {
                    otherUsers.map((i, idx) => {
                        return(
                            <Flex w={'5rem'} key={idx} h={'fit-content'} flexDir={'column'} overflow={'hidden'}>
                                <Circle w={'4rem'} h={'4rem'} border={'1px solid black'}  overflow={'hidden'}>
                                    <Image src={i.profilePhoto} w={'100%'} objectFit={'cover'} />
                                </Circle>
                                <Text noOfLines={'1'}>{i.username}</Text>
                            </Flex>
                        )
                    })
                }


            </Flex>
        </Box>
    )
}

export default Stories
