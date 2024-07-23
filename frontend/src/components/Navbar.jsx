import { Box, Button, Flex, Image, Input, InputGroup, InputLeftAddon, InputLeftElement, Tooltip } from '@chakra-ui/react'
import React from 'react'
import logo from '../assets/homePagelogo.png'
import { IoSearchOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { RiNotification3Line } from "react-icons/ri";

const Navbar = () => {
  return (
    <Flex borderBottom={'1px solid #dadada'} w={'100%'} alignItems={'center'} justifyContent={'space-between'} p={'.2rem 2rem'} height={'10vh'}>
      <Box w={'12%'}>
        <Image src={logo} />
      </Box>

      <Box w={'40%'} h={'fit-content'}>
        <InputGroup>
          <InputLeftElement >
            <IoSearchOutline />
          </InputLeftElement>
          <Input borderColor={'#dadada'} focusBorderColor='#E8EDF3' maxLength={50} placeholder='Search any user' />
        </InputGroup>
      </Box>

      <Flex gap={'2rem'} fontSize={'1.2rem'}>
        <Tooltip >
          <IoChatbubblesOutline cursor={'pointer'} />
        </Tooltip>
        <RiNotification3Line cursor={'pointer'} />
        <LuUser2 cursor={'pointer'} />
      </Flex>
    </Flex>
  )
}

export default Navbar
