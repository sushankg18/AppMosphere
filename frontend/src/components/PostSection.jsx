import { Avatar, Box, Center, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import post1 from '../assets/randomPost1.jpg'
import post2 from '../assets/randomPost2.jpg'
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import Stories from './Stories';
import randomuser from './randomUser.js'
const PostSection = () => {
  // useEffect(() => {
  //   console.log(randomuser[0].picture.large)
  // }, [])
  return (
    <Center w={'50%'} p={'1rem'} className='postSection' h={'86vh'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>


      <Flex flexDir={'column'} gap={'2rem'} overflowX={'hidden'} alignItems={'center'} w={'100%'} h={'100%'} overflowY={'scroll'}>
        <Stories />


        {
          randomuser.map((i, idx) => {
            return (<Flex flexDir={'column'} gap={'.7rem'}>

              <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex alignItems={'center'} gap={'.7rem'}>
                  <Avatar size={'sm'} />
                  <Text color={'black'}>{i.login.username}</Text>
                  <Text fontSize={'30px'}> &#xb7;  </Text>
                  <Text>1m </Text>
                </Flex>
                <FiMoreHorizontal />
              </Flex>


              <Image w={'24rem'} src={i.picture.large} />

              <Flex gap={'2rem'}>
                <FaRegHeart fontSize={'1.3rem'} />
                <FaRegComment fontSize={'1.3rem'} />
                <FiSend fontSize={'1.3rem'} />
              </Flex>

              <Divider />
            </Flex>)
          })
        }



      </Flex>
    </Center>
  )
}

export default PostSection
