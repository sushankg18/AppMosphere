import { Box, Center, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import post1 from '../assets/randomPost1.jpg'
import post2 from '../assets/randomPost2.jpg'
const HomeUserProfile = () => {
  const { authUser } = useSelector(store => store.user)
  if (!authUser) return;


  return (
    <Box className='homeUserProfile' w={'22%'} h={'85vh'} p={'1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
      <Flex flexDir={'column'}  gap={'1rem'} h={'100%'}>

        <Center >
          <Image src={authUser?.profilePhoto} w={'5rem'} />
        </Center>

        <Center flexDir={'column'}>
          <Text fontSize={'1.1rem'} as={'strong'}>{authUser?.fullname}</Text>
          <Text >@{authUser?.username}</Text>
        </Center>

        <Flex fontSize={'.9rem'} justifyContent={'space-between'}>
          <Flex gap={'.4rem'}>
            <Text as={'strong'}>8</Text>
            <Text>posts</Text>
          </Flex>
          <Flex gap={'.4rem'}>
            <Text as={'strong'}>710</Text>
            <Text >followers</Text>
          </Flex>

          <Flex gap={'.4rem'}>
            <Text as={'strong'}>10</Text>
            <Text >following</Text>
          </Flex>
        </Flex>

        <Flex>
          <Text>
            𝘿𝘼𝘿𝘿𝙔 <br></br>
            ↓<br></br>
            "Accept your fate and live like a Man" 💗
          </Text>
        </Flex>

        <Divider />

        <Flex flexWrap={'wrap'}  h={'100%'} overflow={'scroll'} overflowX={'hidden'}  gap={'1rem'} justifyContent={'space-evenly'} >
          <Image w={'6rem'} src={post1} />
          <Image w={'6rem'} src={post2} />
          <Image w={'6rem'} src={post1} />
          <Image w={'6rem'} src={post2} />
          <Image w={'6rem'} src={post1} />
          <Image w={'6rem'} src={post2} />
          <Image w={'6rem'} src={post1} />
          <Image w={'6rem'} src={post2} />
        </Flex>

      </Flex>
    </Box>
  )
}

export default HomeUserProfile
