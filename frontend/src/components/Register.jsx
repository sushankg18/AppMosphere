import { Button, Center, Flex,  Heading, Image, Input, Text } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import React from 'react'
import logo from '../assets/siteLogo.png'
import handshakeImg from '../assets/handshake.jpg'
const Register = () => {
  return (
    <Center bgColor={'#fff'} userSelect={'none'} h={'100vh'} gap={'2rem'} flexDir={'column'}>

      <Center>
        <Image w={'50%'} src={logo} />
      </Center>


      <Flex w={'60%'} minH={'60%'} boxShadow={'1px 1px 15px #dadada ,-1px -1px 15px #dadada'} >

        <Flex width={'50%'}>
            <Image src={handshakeImg} />
        </Flex>

        <Flex w={'50%'} as='form' flexDir={'column'} alignItems={'center'} gap={'2rem'} py={'2rem'}>
          <Flex flexDir={'column'}>
            <Heading fontSize={'1.8rem'}>Create an Account</Heading>
            <Text>Enter your information to get started </Text>
          </Flex>

          <Flex flexDir={'column'} gap={'1rem'} w={'80%'}>

            <Flex flexDir={'column'}>
              <Text as='label'>username</Text>
              <Input focusBorderColor='#000' placeholder='' />
            </Flex>

            <Flex flexDir={'column'}>
              <Text as='label'>email</Text>
              <Input focusBorderColor='#000' placeholder='' />
            </Flex>

            <Flex flexDir={'column'}>
              <Text as='label'>password</Text>
              <Input focusBorderColor='#000' placeholder='' />
            </Flex>

            <Flex flexDir={'column'}>
              <Text as='label'>confirm password</Text>
              <Input focusBorderColor='#000' placeholder='' />
            </Flex>

            <Flex flexDir={'column'}>
              <Button bgColor={'#000'} color={'#fff'}>Register</Button>
            </Flex>

            <Flex gap={'.7rem'}>
              <Text>have an account ?</Text>
              <Link to={'/user/login'} textDecor={'underline 1px solid black'}>Login</Link>
            </Flex>
          </Flex>
        </Flex>


      </Flex>
    </Center>
  )
}

export default Register
