import { Box, Button, Center, Circle, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { FiHeart, FiImage } from "react-icons/fi";
import { CiVideoOn } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineHideImage } from "react-icons/md";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa6";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
const HomeUserProfile = () => {


  const { authUser } = useSelector(store => store.user)
  if (!authUser) return;


  return (
    <Box className='homeUserProfile' overflow={'hidden'} w={'22%'} h={'85vh'} p={'1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
      <Flex flexDir={'column'} gap={'1rem'} h={'100%'}>

        <Center >
          <Circle w={'7rem'} h={'7rem'} overflow={'hidden'}>
            <Image src={authUser?.profilePhoto} w={'100%'} h={'100%'} objectFit={'cover'} />
          </Circle>
        </Center>

        <Center flexDir={'column'}>
          <Text fontSize={'1.1rem'} as={'strong'}>{authUser?.fullname}</Text>
          <Text >@{authUser?.username}</Text>
        </Center>

        <Flex fontSize={'.9rem'} flexWrap={'wrap'} justifyContent={'space-between'}>
          <Flex gap={'.4rem'}>
            <Text as={'strong'}>{authUser?.posts.length}</Text>
            <Text>posts</Text>
          </Flex>
          <Flex gap={'.4rem'}>
            <Text as={'strong'}>{authUser?.followers.length}</Text>
            <Text >followers</Text>
          </Flex>

          <Flex gap={'.4rem'}>
            <Text as={'strong'}>{authUser?.following.length}</Text>
            <Text >following</Text>
          </Flex>
        </Flex>

        <Flex>
          <Text>
            {authUser?.bio}
          </Text>
        </Flex>

        <Tabs variant='unstyled' h={'50%'}>

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

            <TabPanel overflowY={'auto'} h={'85%'}  gap={'1rem'} display={'flex'} flexDir={'column'} alignItems={'center'}>
              {
                authUser?.posts.map((i, idx) => {
                  return (
                    <Flex flexDir={'column'} gap={'1rem'} >

                      <Flex gap={'.4rem'} key={idx}>
                        <Box p={'.3rem 0'}>
                          <AiOutlineRetweet  fontSize={'1.2rem'} />
                        </Box>
                        <Flex flexDir={'column'} gap={'.3rem'} >
                          <Text p={'.3rem .4rem'} bgColor={'#F5F5F5'} noOfLines={2}>{i.title}</Text>
                          <Flex gap={'1rem'} pl={'.3rem'} fontSize={'.9rem'} justifyContent={'space-between'}>
                            <FaRegHeart />
                            <FaRegComment />
                          </Flex>
                          <Flex justifyContent={'space-between'} px={'.3rem'} fontSize={'.9rem'}>
                            <Text>{i.likes.length} likes</Text>
                            <Text>{i.comments.length} comments</Text>
                          </Flex>
                        </Flex>
                      </Flex>

                    </Flex>
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

    </Box>
  )
}

export default HomeUserProfile
