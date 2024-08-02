import { Avatar, Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UsersProfile = () => {
    const [user, setUser] = useState([])
    const { username } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/user/${username}`);
                console.log("found user through frontend: ", response.data.user)
                setUser([response.data.user])
            } catch (error) {
                console.log("Not found user through frontend: ", error)
            }
        }
        fetchUser();
    }, [username]);

    console.log("USER IS: ", user);

    return (
        <Center h={'100vh'} w={'100vw'}>
            <Box w={'50%'} h={'90%'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
                {
                    user.map((i, index) => (
                        <Flex key={index} flexDir={'column'} p={'1rem'}>
                            <Flex gap={'.7rem'} flexDir={'column'} alignItems={'center'}>
                                <Box w={'fit-content'}>
                                    <Avatar w={'7rem'} h={'7rem'} src={i?.profilePhoto} />
                                </Box>

                                <Flex justifyContent={'space-evenly'}  w={'100%'}>

                                    <Flex flexDir={'column'}>
                                        <Text fontSize={'2rem'} fontWeight={'bold'}>{i.fullname}</Text>
                                        <Text>@{i.username}</Text>
                                    </Flex>

                                    <HStack gap={'1rem'}>
                                        <VStack gap={'0'}>
                                            <Text>{i.posts.length}</Text>
                                            <Text fontWeight={'bold'}>Posts</Text>
                                        </VStack>

                                        <VStack gap={'0'}>
                                            <Text>{i.followers.length}</Text>
                                            <Text fontWeight={'bold'}>Followers</Text>
                                        </VStack>

                                        <VStack gap={'0'}>
                                            <Text>{i.following.length}</Text>
                                            <Text fontWeight={'bold'}>Followings</Text>
                                        </VStack>
                                    </HStack>
                                </Flex>
                            </Flex>

                            <Flex>
                                <Text>{i.bio}</Text>
                            </Flex>
                        </Flex>
                    ))
                }
            </Box>
        </Center>
    )
}

export default UsersProfile;
