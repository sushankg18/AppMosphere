import { Button, Center, Flex, Heading, Image, Input, Text, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { MdLogin } from "react-icons/md";
import logo from '../assets/siteLogo.png'
import handshakeImg from '../assets/handshake.jpg'
import axios from 'axios';
// import { LiaUserAltSlashSolid } from "react-icons/lia";
import { setAuthUser } from '../redux/userSlice';
import {useDispatch} from 'react-redux'
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {

      const user = await axios.post('http://localhost:8080/api/v1/user/login',
        {
          email, password
        }, {
        headers: {
          "Content-Type": "application/json"
        }, withCredentials: true
      }
      );

      if (user) {
        console.log("logged in user : ", user.data)
        dispatch(setAuthUser(user.data.logInUser));
        navigate('/')
      }
    } catch (error) {

      if (error.response.status === 400) {
        toast({
          status: "error",
          title: error.response.data.message,
          duration: 4000,
          position: 'top',
        })
      }

      if(error.response.status === 401){
        toast({
          status : "error",
          title : "Looks like you missed something!",
          position : "top",
          duration : 4000,
        })
      }
      console.log("Error while user logging : ", error)
    }
  }
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

          <Flex as={'form'} flexDir={'column'} gap={'1rem'} w={'80%'} alignSelf={'center'} >

            <Flex flexDir={'column'}>
              <Text as='label'>email</Text>
              <Input onChange={(e) => setEmail(e.target.value)} value={email} focusBorderColor='#000' placeholder='' />
            </Flex>

            <Flex flexDir={'column'}>
              <Text as='label'>password</Text>
              <Input onChange={(e) => setPassword(e.target.value)} value={password} focusBorderColor='#000' placeholder='' />
            </Flex>


            <Flex flexDir={'column'}>
              <Button onClick={handleLogin} bgColor={'#000'} color={'#fff'} type='submit' _hover={{ backgroundColor: "#505050" }}>Login</Button>
            </Flex>

            <Flex flexDir={'column'} gap={'.4rem'}>
              <Flex gap={'.3rem'}>
                <Text>Don't have an account ?</Text>
                <Text _hover={{ textDecor: "underline 1px solid black" }} w={'fit-content'}>
                  <Link to={'/user/register'} textDecor={'underline 1px solid black'}>Register</Link>
                </Text>
              </Flex>
              <Text _hover={{ textDecor: "underline 1px solid black" }} w={'fit-content'}>
                <Link to={'/user/forgetpassword'} >Forget Password ?</Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>


      </Flex>
    </Center>
  )
}

export default Login
