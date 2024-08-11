import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  Circle,
  Text,
  Avatar,
  Heading
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import logo from '../assets/homePagelogo.png'
import { IoSearchOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { GrUpdate } from "react-icons/gr";
import { RiNotification3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import getOtherUsers from '../hooks/getOtherUsers';
import { useDispatch, useSelector } from 'react-redux';
import UpdateUserProfile from '../screens/UpdateUserProfile';
import { setAuthUser } from '../redux/userSlice';
import ChatScreen from '../screens/ChatScreen.jsx';
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const { authUser } = useSelector(store => store.user)

  const handleLogout = async () => {
    try {
      const logoutUser = await axios.get("http://localhost:8080/api/v1/user/logout", { withCredentials: true });
      if (logoutUser) {
        dispatch(setAuthUser(null));
        toast({
          status: "success",
          title: logoutUser.data.message,
          duration: 4000,
          position: 'top'
        });
        navigate('/user/login');
        window.location.reload();
      }
    } catch (error) {
      console.log("Error while logout : ", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`http://localhost:8080/api/v1/user/search/${searchTerm}`);
      setSearchResults(response.data)
    }
    if (searchTerm.trim() !== '') {
      fetchUsers();
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  getOtherUsers();
  return (
    <Flex borderBottom={'1px solid #dadada'} w={'100%'} alignItems={'center'} justifyContent={'space-between'} p={'.2rem 2rem'} height={'10vh'}>
      <Box w={'12%'}>
        <Link to={'/'}>
          <Image src={logo} />
        </Link>
      </Box>

      <Box w={'40%'} h={'fit-content'} position={'relative'}>
        <InputGroup>
          <InputLeftElement >
            <IoSearchOutline />
          </InputLeftElement>
          <Input borderColor={'#dadada'} onChange={(e) => setSearchTerm(e.target.value)} focusBorderColor='#E8EDF3' maxLength={50} placeholder='Search any user' />
        </InputGroup>
        {
          searchTerm.length > 0 &&
          <Flex flexDir={'column'} gap={'1rem'} bgColor={'#fff'} zIndex={'4'} minH={'10vh'} p={'.5rem 0'} position={'absolute'} w={'100%'}  >
            {
              searchResults.length > 0 ? (
                searchResults.map((i, idx) => (
                  <Link to={`${i.username}`} key={idx}>
                    <Flex p={'.2rem 1rem'} onClick={() => setSearchTerm('')} _hover={{ bgColor: "#dadada" }} transition={'.1s all ease-in-out'} cursor={'pointer'} alignItems={'center'} gap={'1rem'}>
                      <Avatar w={'2.2rem'} h={'2.2rem'} src={i.profilePhoto} />
                      <Text fontSize={'1rem'} fontWeight={'bold'}>{i.username}</Text>
                    </Flex>
                  </Link>
                ))
              ) : (
                <Flex p={'.2rem 1rem'} alignItems={'center'} justifyContent={'center'}>
                  <Text fontSize={'1rem'} fontWeight={'bold'} color={'red'}>No user found</Text>
                </Flex>
              )
            }
          </Flex>
        }

      </Box>

      <Flex gap={'2rem'} fontSize={'1.5rem'} color={'black'}>
        <ChatScreen />
        <RiNotification3Line color={'gray'} cursor={'pointer'} />
        <Menu>
          <MenuButton>
            <Circle w={'2rem'} h={'2rem'} overflow={'hidden'}>
              {
                authUser
                  ?
                  <Image src={authUser.profilePhoto} objectFit={'cover'} w={'100%'} h={'100%'} />
                  :
                  <LuUser2 color={'gray'} />
              }
            </Circle>
          </MenuButton>

          <MenuList fontSize={'1rem'}>
            <MenuItem gap={'1rem'}>
              <GrUpdate />
              <UpdateUserProfile />
            </MenuItem>

            <Link to={`/${authUser?.username}/setting`}>
              <MenuItem gap={'1rem'}>
                <IoSettingsOutline />
                Settings
              </MenuItem>
            </Link>

            <MenuItem gap={'1rem'} color={'red'} onClick={handleLogout}>
              <LuLogOut />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Navbar
