import { Box, Button, Center, Circle, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { FiHome } from "react-icons/fi";
import reelsLogo from '../assets/reels.png'
import { Link } from 'react-router-dom';
const HomeUserProfile = () => {


  const { authUser } = useSelector(store => store.user)
  if (!authUser) return;


  return (
    <Box className='homeUserProfile' display={'flex'} flexDir={'column'} gap={'2rem'} overflow={'hidden'} w={'22%'} h={'85vh'} p={'.2rem .3rem'} >
      <Flex flexDir={'column'} gap={'1rem'} h={'fit-content'} p={'.5rem 1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>

        <Center >
          <Circle w={'7rem'} h={'7rem'} overflow={'hidden'}>
            <Image src={authUser?.profilePhoto} w={'100%'} h={'100%'} objectFit={'cover'} />
          </Circle>
        </Center>

        <Center flexDir={'column'}>
          <Text fontSize={'1.1rem'} as={'strong'}>{authUser?.fullname}</Text>
          <Text >@{authUser?.username}</Text>
        </Center>

        <Flex fontSize={'.9rem'}>
          <Text>
            {authUser?.bio}
          </Text>
        </Flex>

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


      </Flex>

      <Flex flexDir={'column'} gap={'1rem'} h={'fit-content'} p={'.5rem 1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>

        <Link >
          <Flex py={'.3rem'} cursor={'pointer'} gap={'.7rem'} >
            <Image src={reelsLogo} w={'1.5rem'} h={'1.5rem'} />
            <Text>Add to story</Text>
          </Flex>
        </Link>

        <Link >
          <Flex py={'.3rem'} cursor={'pointer'} gap={'.7rem'}>
            <FiHome fontSize={'1.5rem'} />
            <Text>upload post</Text>
          </Flex>
        </Link>
        <Link >
          <Flex py={'.3rem'} cursor={'pointer'} gap={'.7rem'}>
            <FiHome fontSize={'1.5rem'} />
            <Text>upload reel</Text>
          </Flex>
        </Link>
      </Flex>

      <Flex flexDir={'column'} gap={'1rem'} h={'fit-content'} p={'.5rem 1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>


        <Link to={'/'}>
          <Flex py={'.3rem'} cursor={'pointer'} gap={'.7rem'}>
            <FiHome fontSize={'1.5rem'} />
            <Text>Home</Text>
          </Flex>
        </Link>
        <Link to={'/reels'}>
          <Flex py={'.3rem'} cursor={'pointer'} gap={'.7rem'} >
            <Image src={reelsLogo} w={'1.5rem'} h={'1.5rem'} />
            <Text>Reels</Text>
          </Flex>
        </Link>
      </Flex>

    </Box >
  )
}

export default HomeUserProfile
