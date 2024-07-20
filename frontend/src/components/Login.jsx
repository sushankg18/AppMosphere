import {  Button, Center, Flex, Heading, Image, Input, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { MdLogin } from "react-icons/md";
import logo from '../assets/siteLogo.png'
import handshakeImg from '../assets/handshake.jpg'
const Login = () => {
  return (
    <Center bgColor={'#fff'} h={'100vh'} gap={'2rem'} userSelect={'none'} flexDir={'column'}>

      <Center>
        <Image w={'50%'} src={logo} />
      </Center>


      <Flex w={'60%'} minH={'60%'} boxShadow={'1px 1px 15px #dadada ,-1px -1px 15px #dadada'} >

        <Flex width={'50%'}>
          <Image src={handshakeImg} />
        </Flex>

        <Flex w={'50%'} as='form' flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={'2rem'} py={'2rem'}>

          <Flex gap={'1rem'}>
            <Heading>
              <MdLogin />
            </Heading>
            <Heading fontSize={'1.8rem'}>Welcome back</Heading>
          </Flex>

          <Flex flexDir={'column'} gap={'1rem'} w={'80%'} alignSelf={'center'} >

            <Flex flexDir={'column'}>
              <Text as='label'>email</Text>
              <Input focusBorderColor='#000' placeholder='' />
            </Flex>

            <Flex flexDir={'column'}>
              <Text as='label'>password</Text>
              <Input focusBorderColor='#000' placeholder='' />
            </Flex>


            <Flex flexDir={'column'}>
              <Button bgColor={'#000'} color={'#fff'} _hover={{backgroundColor : "#505050"}}>Login</Button>
            </Flex>

            <Flex gap={'.7rem'}>
              <Text>Don't have an account ?</Text>
              <Link to={'/user/register'} textDecor={'underline 1px solid black'}>Register</Link>
            </Flex>
          </Flex>
        </Flex>


      </Flex>
    </Center>
  )
}

export default Login
