import { Avatar, Box, Button, Center, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, InputLeftElement, SimpleGrid, Text, useDisclosure, VStack } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { FiHeart, FiImage, FiSearch } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineHideImage } from "react-icons/md";
import { FaComment, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
const UsersProfile = () => {
    const [user, setUser] = useState([])
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { username } = useParams();
    const { authUser } = useSelector(store => store.user)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/user/${username}`);
                console.log(response.data)
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

                                        <VStack gap={'0'} cursor={'pointer'}>
                                            <Basic length={i.followers.length} followers={i.followers} message={"Followers"} userId={i?._id} />
                                        </VStack>

                                        <VStack gap={'0'} cursor={'pointer'}>
                                            <Basic length={i.following.length} following={i.following} message={"Followings"} userId={i?._id} />
                                        </VStack>
                                    </HStack>
                                </Flex>

                                <Tabs borderTop={'1px solid #dadada'} variant='unstyled' overflow={'hidden'} h={'68%'}>

                                    <TabList justifyContent={'space-evenly'} >
                                        <Tab _selected={{ color: 'black', bg: 'gray.100' }} fontSize={'1.3rem'}><FiImage /></Tab>
                                        <Tab _selected={{ color: 'black', bg: 'gray.100' }} fontSize={'1.3rem'}><HiOutlineVideoCamera /></Tab>
                                        <Tab _selected={{ color: 'black', bg: 'gray.100' }} fontSize={'1.3rem'}><AiOutlineRetweet /></Tab>
                                    </TabList>

                                    <TabPanels h={'100%'}>

                                        <TabPanel h={'100%'} display={'flex'} justifyContent={'space-evenly'}>
                                            <SimpleGrid pb={'2rem'} columns={3} px={'1rem'} spacing={'1rem'} overflowY={'auto'}>
                                                {i.posts.map((post, idx) => {
                                                    return (
                                                        post.post && (
                                                            <Box
                                                                key={idx}
                                                                w={'12rem'}
                                                                h={'12rem'}
                                                                onMouseEnter={() => setHoveredIndex(idx)}
                                                                onMouseLeave={() => setHoveredIndex(null)}
                                                                position={'relative'}
                                                                cursor={'pointer'}
                                                                border={'1px solid #dadada'}
                                                            >
                                                                <Image src={post.post} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                                {hoveredIndex === idx && (
                                                                    <Flex
                                                                        w={'100%'}
                                                                        h={'100%'}
                                                                        position={'absolute'}
                                                                        bgColor={'rgba(0, 0, 0, 0.5)'}
                                                                        top={'0'}
                                                                        zIndex={'88'}
                                                                        alignItems={'center'}
                                                                        justifyContent={'center'}
                                                                    >
                                                                        <HStack color={'white'} gap={'1rem'} >
                                                                            <HStack gap={'.3rem'}>
                                                                                <FaHeart />
                                                                                <Text color={'white'}>{post.likes.length}</Text>
                                                                            </HStack>
                                                                            <HStack gap={'.3rem'}>
                                                                                <FaComment />
                                                                                <Text color={'white'}>{post.comments.length}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </Flex>
                                                                )}
                                                            </Box>
                                                        )
                                                    );
                                                })}
                                            </SimpleGrid>
                                        </TabPanel>

                                        <TabPanel h={'100%'} display={'flex'} gap={'1rem'} justifyContent={'space-around'}>
                                            <SimpleGrid pb={'2rem'} columns={3} px={'1rem'} spacing={'1rem'} overflowY={'auto'}>
                                                {i.posts.map((post, idx) => {
                                                    return (
                                                        post.video && (
                                                            <Box
                                                                key={idx}
                                                                w={'12rem'}
                                                                h={'12rem'}
                                                                onMouseEnter={() => setHoveredIndex(idx)}
                                                                onMouseLeave={() => setHoveredIndex(null)}
                                                                position={'relative'}
                                                                cursor={'pointer'}
                                                                border={'1px solid #dadada'}
                                                            >
                                                                <video src={post.video} muted style={{ width: "100%", height: "100%", objectFit: "cover" }}></video>
                                                                {hoveredIndex === idx && (
                                                                    <Flex
                                                                        w={'100%'}
                                                                        h={'100%'}
                                                                        position={'absolute'}
                                                                        bgColor={'rgba(0, 0, 0, 0.5)'}
                                                                        top={'0'}
                                                                        zIndex={'88'}
                                                                        alignItems={'center'}
                                                                        justifyContent={'center'}
                                                                    >
                                                                        <HStack color={'white'} gap={'1rem'} >
                                                                            <HStack gap={'.3rem'}>
                                                                                <FaHeart />
                                                                                <Text color={'white'}>{post.likes.length}</Text>
                                                                            </HStack>
                                                                            <HStack gap={'.3rem'}>
                                                                                <FaComment />
                                                                                <Text color={'white'}>{post.comments.length}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </Flex>
                                                                )}
                                                            </Box>
                                                        )
                                                    );
                                                })}
                                            </SimpleGrid>
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

function Basic({ length, message, following, followers, userId }) {
    const { authUser } = useSelector(store => store.user)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <VStack onClick={onOpen}>
                <Text>{length}</Text>
                <Text fontWeight={'bold'}>{message}</Text>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent >

                    <ModalHeader alignSelf={'center'}>{message}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody minH={'20vh'} maxH={'fit-content'}>
                        <Flex flexDir={'column'} gap={'1rem'}>
                            <InputGroup>
                                <InputLeftElement >
                                    <FiSearch />
                                </InputLeftElement>
                                <Input borderColor={'#dadada'} focusBorderColor='#E8EDF3' placeholder='Search any user' />
                            </InputGroup>
                            {
                                message === "Followers" ?
                                    followers?.map((follower, index) => {
                                        const isFollowing = authUser?.following?.includes(follower?._id)
                                        return (
                                            <HStack key={index} justifyContent={'space-between'}>
                                                <Flex gap={'.8rem'}>
                                                    <Avatar w={'2.5rem'} h={'2.5rem'} src={follower?.profilePhoto} />
                                                    <Flex flexDir={'column'} >
                                                        <Text fontWeight={'bold'}>{follower?.username}</Text>
                                                        <Text>{follower?.fullname}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Button
                                                    display={authUser?._id === follower?._id ? "none" : 'flex'}
                                                    bgColor={isFollowing ? '#dadada' : "black"}
                                                    w={'6rem'}
                                                    color={isFollowing ? "black" : 'white'}
                                                    _hover={isFollowing ? { bgColor: "rgb(230, 230, 230)" } : { bgColor: "rgb(70, 70, 70)" }}
                                                    p={' .9rem'}
                                                    fontSize={'.9rem'}
                                                    size={'xs'}
                                                    fontWeight={'bold'}>

                                                    {authUser?._id === userId ? "remove" : isFollowing ? "Following" : "Follow"}

                                                </Button>

                                            </HStack>
                                        )
                                    })
                                    :
                                    following.map((following, idx) => {
                                        return (
                                            <HStack key={idx} gap={'.8rem'}>
                                                <Avatar w={'2.5rem'} h={'2.5rem'} src={following?.profilePhoto} />
                                                <Flex flexDir={'column'} >
                                                    <Text fontWeight={'bold'}>{following?.username}</Text>
                                                    <Text>{following?.fullname}</Text>
                                                </Flex>
                                            </HStack>
                                        )
                                    })

                            }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UsersProfile;
