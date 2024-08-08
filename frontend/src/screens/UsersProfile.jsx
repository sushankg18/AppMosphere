import { Avatar, Box, Button, Center, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { FiHeart, FiImage } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineHideImage } from "react-icons/md";
import { FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
const UsersProfile = () => {
    const [user, setUser] = useState([])
    const { username } = useParams();
    const { authUser } = useSelector(store => store.user)
    const dispatch = useDispatch()
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
    const handleFollow = async (userId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/user/follow/${authUser?._id}/${userId}`)
            console.log("Followed user through frontend", response)
            dispatch(setAuthUser(response.data.lgUser))
            // if(response.data.status)
        } catch (error) {
            console.log("Error while following user thorugh frontend : ", error)
        }
    }



    return (
        <Center h={'90vh'} w={'100vw'}>
            <Box w={'50%'} h={'90%'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
                {
                    user.map((i, index) => {

                        const isFollowed = authUser?.following.includes(i._id)
                        const isLoggedinUser = authUser?._id !== i._id
                        console.log("authuser id : ", authUser?._id)
                        console.log("user.map id : ", i?._id)
                        return (

                            <Flex h={'100%'} key={index} flexDir={'column'} gap={'1rem'} p={'1rem'}>

                                <Flex gap={'1.4rem'}>
                                    <Box w={'fit-content'}>
                                        <Avatar w={'6.5rem'} h={'6.5rem'} src={i?.profilePhoto} />
                                    </Box>


                                    <Flex flexDir={'column'} w={'100%'} >
                                        <Text fontSize={'2rem'} fontWeight={'bold'}>{i.fullname}</Text>
                                        <Text>@{i.username}</Text>
                                        <Text w={'70%'} noOfLines={'1'}>{i.bio}</Text>
                                    </Flex>
                                    {
                                        isLoggedinUser && (

                                            <Flex>
                                                {
                                                    isFollowed ?
                                                        <Button onClick={() => handleFollow(i._id)} bgColor={'#dadada'} w={'6rem'} color={'black'} _hover={{ bgColor: "rgb(230, 230, 230)" }} p={' .9rem'} fontSize={'.9rem'} size={'xs'} fontWeight={'bold'}>Following</Button>
                                                        :
                                                        <Button onClick={() => handleFollow(i._id)} bgColor={'black'} w={'6rem'} color={'white'} _hover={{ bgColor: "rgb(70, 70, 70)" }} p={' .9rem'} fontSize={'.9rem'} size={'xs'} fontWeight={'bold'}>Follow</Button>
                                                }
                                            </Flex>
                                        )
                                    }

                                </Flex>

                                <Flex justifyContent={'center'} color={'gray'}>
                                    <HStack justifyContent={'space-evenly'} w={'100%'} >
                                        <VStack gap={'0'}>
                                            <Text>{i.posts.length}</Text>
                                            <Text fontWeight={'bold'}>Posts</Text>
                                        </VStack>

                                        <VStack gap={'0'}>
                                            <Text>{i.followers.length}</Text>
                                            <Text fontWeight={'bold'}>Followers</Text>
                                        </VStack>

                                        <VStack gap={'0'} cursor={'pointer'}>
                                            <Text>{i.following.length}</Text>
                                            <Text fontWeight={'bold'}>Followings</Text>
                                        </VStack>
                                    </HStack>
                                </Flex>

                                <Tabs borderTop={'1px solid #dadada'} variant='unstyled' h={'68%'}>

                                    <TabList justifyContent={'space-evenly'} >
                                        <Tab _selected={{ color: 'black', bg: 'gray.100' }} fontSize={'1.3rem'}><FiImage /></Tab>
                                        <Tab _selected={{ color: 'black', bg: 'gray.100' }} fontSize={'1.3rem'}><AiOutlineRetweet /></Tab>
                                        <Tab _selected={{ color: 'black', bg: 'gray.100' }} fontSize={'1.3rem'}><HiOutlineVideoCamera /></Tab>
                                    </TabList>

                                    <TabPanels h={'100%'}>

                                        <TabPanel h={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <MdOutlineHideImage fontSize={'2rem'} />
                                            <Text>No post yet</Text>
                                        </TabPanel>

                                        <TabPanel overflowY={'auto'} h={'90%'} gap={'1rem'} display={'flex'} flexDir={'column'} alignItems={'center'}>
                                            {
                                                i.posts.map((post, idx) => {
                                                    return (
                                                        <>
                                                            <Flex w={'100%'} flexDir={'column'} gap={'1rem'} >

                                                                <Flex w={'100%'} gap={'.4rem'} key={idx}>
                                                                    <Box p={'.3rem 0'}>
                                                                        <AiOutlineRetweet fontSize={'1.2rem'} />
                                                                    </Box>
                                                                    <Flex w={'100%'} flexDir={'column'} gap={'.3rem'} >
                                                                        <Text p={'.3rem .4rem'} bgColor={'#F5F5F5'} noOfLines={2}>{post.title}</Text>
                                                                        <Flex gap={'.3rem'} pl={'.3rem'} fontSize={'.9rem'} flexDir={'column'}>
                                                                            <Flex alignItems={'center'} gap={'.5rem'}>
                                                                                <FaRegHeart />
                                                                                <Text>{post.likes.length} likes</Text>
                                                                            </Flex>
                                                                            <Flex alignItems={'center'} gap={'.5rem'}>
                                                                                <FaRegComment />
                                                                                <Text>{post.comments.length} comments</Text>
                                                                            </Flex>
                                                                        </Flex>
                                                                    </Flex>
                                                                </Flex>

                                                            </Flex>


                                                        </>
                                                    )
                                                })
                                            }
                                        </TabPanel>

                                        <TabPanel h={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <p>three!</p>
                                        </TabPanel>

                                    </TabPanels>

                                </Tabs>

                            </Flex>
                        )
                    })
                }
            </Box>
        </Center>
    )
}

export default UsersProfile;
