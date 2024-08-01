import { Box, Button, Center, Circle, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { FiImage } from "react-icons/fi";
import { IoVideocamOutline } from "react-icons/io5";


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

        <Divider />

        <Flex  h={'100%'}>
          <Flex  h={'fit-content'} w={'100%'} justifyContent={'space-evenly'} fontSize={'1.5rem'}>
            <FiImage />
            <IoVideocamOutline />
          </Flex>
        </Flex>
      </Flex>

    </Box>
  )
}

export default HomeUserProfile
