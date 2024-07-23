import React, { useState, useEffect } from 'react'
import { Button, Center, Flex, Heading, Image, Input, Radio, RadioGroup, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/siteLogo.png'
import handshakeImg from '../assets/handshake.jpg'
const Register = () => {

  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [isPassConf, setIsPassConf] = useState(false)

  const toast = useToast();
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();

    if (emailError) {
      toast({
        status: "error",
        title: "email must include @gmail.com",
        duration: 2000,
        position: "top"
      });
    }
    else {

      try {
        console.log(fullname)
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        const user = await axios.post('http://localhost:8080/api/v1/user/register', {
          fullname,
          username,
          email,
          password,
          gender,
          confirmPassword,
        }, {
          headers: {
            "Content-Type ": "application/json"
          }, withCredentials: true,

        }
        )

        if (user) {
          toast({
            status: "success",
            title: user.data.message,
            position: 'top',
            duration: 2000
          })
          navigate('/user/login')
          console.log("user created successfully : ", user)
        }
      } catch (error) {
        console.log("frontend register error : ", error)
      }

    }
  }

  const handleFullname = (e) => {
    setFullname(e.target.value);
  }

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(value)) {
      setUsername(value);
    }
  };

  const handleKeyDown = (event) => {
    const invalidChars = [' ', '#', '@', '$', '%', '^', '&', '*', '(', ')', '!', '+', '=', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '\\', '|', '~', '`'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  };

  // Email validation
  const emailValidation = (e) => {
    const email = e.target.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmail(e.target.value)
      setEmailError(false);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  const handleCheckConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (confirmPassword.length > 0 && password === confirmPassword) {
      setIsPassConf(true);
    } else {
      setIsPassConf(false);
    }
  }, [password, confirmPassword]);


  return (
    <Center bgColor={'#fff'} userSelect={'none'} h={'100vh'} gap={'2rem'} flexDir={'column'}>

      <Center>
        <Image w={'50%'} src={logo} />
      </Center>


      <Flex w={'60%'} minH={'60%'} boxShadow={'1px 1px 15px #dadada ,-1px -1px 15px #dadada'} >

        <Flex width={'50%'}>
          <Image src={handshakeImg} />
        </Flex>

        <Flex w={'50%'} as='form' flexDir={'column'} alignItems={'center'} gap={'1.5rem'} py={'2rem'}>
          <Flex flexDir={'column'}>
            <Heading fontSize={'1.8rem'}>Create an Account</Heading>
            <Text>Enter your information to get started </Text>
          </Flex>

          <Flex flexDir={'column'} gap={'1rem'} w={'80%'}>

            <Flex flexDir={'column'}>
              <Input onChange={handleFullname} maxLength={30} focusBorderColor='#000' placeholder='fullname' />
            </Flex>

            <Flex flexDir={'column'}>
              <Input onChange={handleUsernameChange} onKeyDown={handleKeyDown} maxLength={25} focusBorderColor='#000' placeholder='username' />
            </Flex>

            <Flex flexDir={'column'}>
              <Input onChange={emailValidation} type='email' focusBorderColor='#000' placeholder='email' required />
            </Flex>

            <Flex flexDir={'column'}>
              <Input onChange={handlePassword} minLength={8} focusBorderColor='#000' placeholder='password' />
            </Flex>

            <Flex flexDir={'column'}>
              <Input onChange={handleCheckConfirmPassword} minLength={8} focusBorderColor='#000' placeholder='confirm password' />
              {confirmPassword === "" ? null : isPassConf ? <Text fontSize={'.8rem'} color={'green'}>*password is matched</Text> : <Text fontSize={'.8rem'} color={'red'}>*password is not matched</Text>}
            </Flex>

            <RadioGroup display={'flex'} gap={'2rem'} onChange={setGender} value={gender}>
              <Radio value='male'>male</Radio>
              <Radio value='female'>female</Radio>
            </RadioGroup>

            <Flex flexDir={'column'}>
              <Button bgColor={'#000'} color={'#fff'} _hover={{ backgroundColor: "#505050" }} type='submit' onClick={handleRegister}>Register</Button>
            </Flex>

            <Flex gap={'.7rem'}>
              <Text>have an account ?</Text>
              <Text _hover={{ textDecor: "underline 1px solid black" }}>
                <Link to={'/user/login'} textDecor={'underline 1px solid black'}>Login</Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>


      </Flex>
    </Center>
  )
}

export default Register
