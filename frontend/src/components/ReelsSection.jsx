import { Avatar, Box, Center, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart, FaRegShareFromSquare } from 'react-icons/fa6'
import { CgMoreVertical } from "react-icons/cg";
import { CiMusicNote1 } from "react-icons/ci";
import { setReels } from '../redux/ReelsSlice.js'
import { FiSend } from 'react-icons/fi'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ReelsSection = () => {
    const [reels, setReels] = useState([])
    const { authUser } = useSelector(store => store.user)
    useEffect(() => {
        const fetchReels = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/post/getreels`);
                console.log("Reels fetched successfully through frontend : ", res.data.allReels)
                setReels(res.data.allReels)
            }
            catch (error) {
                console.log("Error while fetching reels throug frontend : ", error)
            }
        }
        fetchReels()
    }, [])

    return (
        <Center w={'77%'} p={'1rem'} className='postSection' h={'86vh'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>

            {
                reels.map((reel, index) => {
                    return (

                        <Flex key={index} h={'33rem'} w={'23.5rem'} gap={'.5rem'}>

                            <Box w={'100%'} overflow={'hidden'} height={'100%'} position={'relative'} border={'2px solid #dadada'} borderRadius={'.8rem'}>

                                <video src={reel.video} loop autoPlay muted style={{ width: "100%", height: "100%", objectFit: "contain" }} ></video>
                                <Flex flexDir={'column'} gap={'.3rem'} color={'white'} position={'absolute'} bottom={'1rem'} p={'0 1rem'}>
                                    <Flex alignItems={'center'} gap={'.5rem'}>
                                        <Avatar src={reel.owner.profilePhoto} w={'2rem'} h={'2rem'} />
                                        <Text fontWeight={'bold'} >{reel.owner.username}</Text>
                                    </Flex>
                                    <Flex mb={'.5rem'}>
                                        <Text fontSize={'.9rem'}>{reel.title}</Text>
                                    </Flex>
                                    <Flex alignItems={'center'} gap={'.5rem'}>
                                        <CiMusicNote1 />
                                        <Text fontSize={'.9rem'}>by {reel.owner.username}</Text>
                                    </Flex>

                                </Flex>

                            </Box>

                            <Flex flexDir={'column'} position={'relative'} justifyContent={'center'} h={'100%'} px={'.5rem'} fontSize={'1.3rem'}>

                                <Flex flexDir={'column'} gap={'1.4rem'}  >
                                    <FaRegHeart cursor={'pointer'} />
                                    <FaRegComment cursor={'pointer'} />
                                    <FiSend cursor={'pointer'} />
                                </Flex>

                                <Flex alignSelf={'flex-end'} flexDir={'column'} gap={'1rem'} position={'absolute'} bottom={'1rem'}>
                                    <FaRegBookmark cursor={'pointer'} />
                                    {
                                        authUser?._id === reel.owner._id &&
                                        <CgMoreVertical cursor={'pointer'} />
                                    }
                                </Flex>
                            </Flex>

                        </Flex>
                    )
                })
            }
        </Center>
    )
}

export default ReelsSection
