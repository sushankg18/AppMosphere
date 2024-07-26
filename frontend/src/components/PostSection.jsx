import { Avatar, Box, Center, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import post1 from '../assets/randomPost1.jpg'
import post2 from '../assets/randomPost2.jpg'
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import Stories from './Stories';

const PostSection = () => {
  return (
    <Center w={'50%'} p={'1rem'} className='postSection' h={'86vh'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>


      <Flex flexDir={'column'} gap={'2rem'} overflowX={'hidden'}  alignItems={'center'} w={'100%'} h={'100%'} overflowY={'scroll'}>
        <Stories />

        <Flex flexDir={'column'} gap={'.7rem'}>

          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} gap={'.7rem'}>
              <Avatar size={'sm'} />
              <Text>Sushank</Text>
              <Text>*</Text>
              <Text>1m </Text>
            </Flex>
            <FiMoreHorizontal />
          </Flex>


          <Image w={'24rem'} src={post1} />

          <Flex gap={'2rem'}>
            <FaRegHeart fontSize={'1.3rem'} />
            <FaRegComment fontSize={'1.3rem'} />
            <FiSend fontSize={'1.3rem'} />
          </Flex>

          <Divider />
        </Flex>



        <Flex flexDir={'column'} gap={'.7rem'}>

          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} gap={'.7rem'}>
              <Avatar size={'sm'} />
              <Text>Sushank</Text>
              <Text>*</Text>
              <Text>1m </Text>
            </Flex>
            <FiMoreHorizontal />
          </Flex>


          <Image w={'24rem'} src={post2} />

          <Flex gap={'2rem'}>
            <FaRegHeart fontSize={'1.3rem'} />
            <FaRegComment fontSize={'1.3rem'} />
            <FiSend fontSize={'1.3rem'} />
          </Flex>

          <Divider />
        </Flex>


        <Flex flexDir={'column'} gap={'.7rem'}>

          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} gap={'.7rem'}>
              <Avatar size={'sm'} />
              <Text>Sushank</Text>
              <Text>*</Text>
              <Text>1m </Text>
            </Flex>
            <FiMoreHorizontal />
          </Flex>


          <Image w={'24rem'} src={post1} />

          <Flex gap={'2rem'}>
            <FaRegHeart fontSize={'1.3rem'} />
            <FaRegComment fontSize={'1.3rem'} />
            <FiSend fontSize={'1.3rem'} />
          </Flex>

          <Divider />
        </Flex>


        <Flex flexDir={'column'} gap={'.7rem'}>

          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} gap={'.7rem'}>
              <Avatar size={'sm'} />
              <Text>Sushank</Text>
              <Text>*</Text>
              <Text>1m </Text>
            </Flex>
            <FiMoreHorizontal />
          </Flex>


          <Image w={'24rem'} src={post2} />

          <Flex gap={'2rem'}>
            <FaRegHeart fontSize={'1.3rem'} />
            <FaRegComment fontSize={'1.3rem'} />
            <FiSend fontSize={'1.3rem'} />
          </Flex>

          <Divider />
        </Flex>


        <Flex flexDir={'column'} gap={'.7rem'}>

          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} gap={'.7rem'}>
              <Avatar size={'sm'} />
              <Text>Sushank</Text>
              <Text>*</Text>
              <Text>1m </Text>
            </Flex>
            <FiMoreHorizontal />
          </Flex>


          <Image w={'24rem'} src={post1} />

          <Flex gap={'2rem'}>
            <FaRegHeart fontSize={'1.3rem'} />
            <FaRegComment fontSize={'1.3rem'} />
            <FiSend fontSize={'1.3rem'} />
          </Flex>

          <Divider />
        </Flex>


        <Flex flexDir={'column'} gap={'.7rem'}>

          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} gap={'.7rem'}>
              <Avatar size={'sm'} />
              <Text>Sushank</Text>
              <Text>*</Text>
              <Text>1m </Text>
            </Flex>
            <FiMoreHorizontal />
          </Flex>


          <Image w={'24rem'} src={post2} />

          <Flex gap={'2rem'}>
            <FaRegHeart fontSize={'1.3rem'} />
            <FaRegComment fontSize={'1.3rem'} />
            <FiSend fontSize={'1.3rem'} />
          </Flex>

          <Divider />
        </Flex>
      </Flex>
    </Center>
  )
}

export default PostSection
