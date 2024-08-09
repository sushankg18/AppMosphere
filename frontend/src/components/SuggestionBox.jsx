import { Box, Button, Center, Circle, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import GetOtherUsers from '../hooks/getOtherUsers'
import axios from 'axios'
import { setAuthUser } from '../redux/userSlice'

const SuggestionBox = () => {
  const [followings, setFollowings] = useState()
  const { otherUsers, authUser } = useSelector(store => store.user)
  const dispatch = useDispatch()

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
    <Box w={'24%'} maxH={'85vh'} minH={'fit-content'} p={'1rem'} display={'flex'} overflow={'hidden'} flexDir={'column'} gap={'1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
      <Center h={'10%'}>
        <Heading fontSize={'1.3rem'}>Suggestions</Heading>
      </Center>
      <Flex flexDir={'column'} overflowY={'auto'} h={'90%'} gap={'1rem'}>
        {
          otherUsers?.map((item, idx) => {
            const isFollowing = authUser?.following.includes(item._id);
            return (
              <>
                <Flex p={'.4rem .5rem'}  maxW={'100%'} gap={'.7rem'} alignItems={'center'} key={idx}>
                  <Circle w={'3rem'} h={'3rem'} overflow={'hidden'}>
                    <Image src={item?.profilePhoto} w={'100%'} h={'100%'} objectFit={'cover'} />
                  </Circle>

                  <Flex flexDir={'column'} justifyContent={'space-between'}  gap={'.3rem'} minW={'80%'}>
                    <Link to={`/${item.username}`}>
                      <Text fontWeight={'bold'} w={'100%'}   noOfLines={'1'} color={'black'}>{item?.username}</Text>
                    </Link>
                    {
                      isFollowing ?
                        <Button onClick={() => handleFollow(item._id)} bgColor={'#dadada'} w={'6rem'} color={'black'} _hover={{ bgColor: "rgb(230, 230, 230)" }} p={' .9rem'} fontSize={'.9rem'} size={'xs'} fontWeight={'bold'}>Following</Button>
                        :
                        <Button onClick={() => handleFollow(item._id)} bgColor={'black'} w={'6rem'} color={'white'} _hover={{ bgColor: "rgb(70, 70, 70)" }} p={' .9rem'} fontSize={'.9rem'} size={'xs'} fontWeight={'bold'}>Follow</Button>
                    }
                  </Flex>
                </Flex >

              </>
            )
          })
        }
      </Flex>
    </Box >
  )
}

export default SuggestionBox
