import { Avatar, Box, Center, Flex, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { FaPlay } from "react-icons/fa";
import { CgMoreVertical } from "react-icons/cg";
import { CiMusicNote1 } from "react-icons/ci";
import { FiSend } from 'react-icons/fi'
import axios from 'axios';
import { useSelector } from 'react-redux';

const ReelsSection = () => {
    const [reels, setReels] = useState([]);
    const [isReelPaused, setIsReelPaused] = useState([]);
    const { authUser } = useSelector(store => store.user);
    const videoRef = useRef([]);

    useEffect(() => {
        const fetchReels = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/post/getreels`);
                console.log("Reels fetched successfully through frontend : ", res.data.allReels);
                setReels(res.data.allReels);
                setIsReelPaused(new Array(res.data.allReels.length).fill(false)); 
            }
            catch (error) {
                console.log("Error while fetching reels through frontend : ", error);
            }
        }
        fetchReels();
    }, []);

    const handlePlayReel = (i) => {
        const videoRefCurr = videoRef.current[i];
        if (videoRefCurr) {
            if (isReelPaused[i]) {
                videoRefCurr.play();
                setIsReelPaused(prev => prev.map((paused, idx) => idx === i ? false : paused));
            } else {
                videoRefCurr.pause();
                setIsReelPaused(prev => prev.map((paused, idx) => idx === i ? true : paused));
            }
        }
    }

    return (
        <Center w={'77%'} flexDir={'column'} className='postSection' overflowY={'hidden'} h={'86vh'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
            <Flex flexDir={'column'} w={'100%'} h={'100%'} scrollSnapType={'y mandatory'} overflowY={'scroll'} p={'1rem'} gap={'1rem'}>
                {
                    reels.map((reel, index) => (
                        <Flex alignItems={'center'} justifyContent={'center'} w={'100%'} py={'1rem'} key={index} minH={'35rem'} scrollSnapAlign={'start'} overflow={'hidden'} gap={'.5rem'} >
                            <Box minW={'22rem'} overflow={'hidden'} height={'35rem'} position={'relative'} borderRadius={'.8rem'}>
                                <video
                                    ref={el => videoRef.current[index] = el}
                                    src={reel.video}
                                    loop autoPlay muted
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onClick={() => handlePlayReel(index)}
                                ></video>

                                <Flex flexDir={'column'} gap={'.3rem'} color={'white'} position={'absolute'} bottom={'1rem'} p={'0 1rem'}>
                                    <Flex alignItems={'center'} gap={'.5rem'}>
                                        <Avatar src={reel.owner.profilePhoto} w={'2.2rem'} h={'2.2rem'} />
                                        <Text fontWeight={'bold'} fontSize={'1.1rem'}>{reel.owner.username}</Text>
                                    </Flex>
                                    <Flex mb={'.5rem'}>
                                        <Text>{reel.title}</Text>
                                    </Flex>
                                    <Flex alignItems={'center'} w={'80%'} gap={'.5rem'}>
                                        <CiMusicNote1 />
                                        <marquee>by {reel.owner.username} {reel.owner.username} {reel.owner.username} {reel.owner.username}</marquee>
                                    </Flex>
                                </Flex>
                            </Box>

                            <Flex alignItems={'flex-end'} h={'100%'} p={'1rem .5rem'}>
                                <Flex flexDir={'column'} gap={'1.4rem'} fontSize={'1.2rem'}>
                                    <VStack gap={'0'}>
                                        <FaRegHeart cursor={'pointer'} />
                                        <Text fontSize={'.9rem'}>{reel.likes.length}</Text>
                                    </VStack>

                                    <VStack gap={'0'}>
                                        <FaRegComment cursor={'pointer'} />
                                        <Text fontSize={'.9rem'}>{reel.comments.length}</Text>
                                    </VStack>

                                    <VStack>
                                        <FiSend cursor={'pointer'} />
                                    </VStack>

                                    <FaRegBookmark cursor={'pointer'} />
                                    {authUser?._id === reel.owner._id && <CgMoreVertical cursor={'pointer'} />}
                                </Flex>
                            </Flex>
                        </Flex>
                    ))
                }
            </Flex>
        </Center>
    )
}

export default ReelsSection;
