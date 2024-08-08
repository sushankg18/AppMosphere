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
  Circle
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import logo from '../assets/homePagelogo.png'
import { IoSearchOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
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
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const { authUser } = useSelector(store => store.user)
  // if (authUser) return ;

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
        window.location.reload(); // Optional: force a page reload to clear any in-memory state
      }
    } catch (error) {
      console.log("Error while logout : ", error);
    }
  };

  getOtherUsers();
  return (
    <Flex borderBottom={'1px solid #dadada'} w={'100%'} alignItems={'center'} justifyContent={'space-between'} p={'.2rem 2rem'} height={'10vh'}>
      <Box w={'12%'}>
        <Link to={'/'}>
          <Image src={logo} />
        </Link>
      </Box>

      <Box w={'40%'} h={'fit-content'}>
        <InputGroup>
          <InputLeftElement >
            <IoSearchOutline />
          </InputLeftElement>
          <Input borderColor={'#dadada'} focusBorderColor='#E8EDF3' maxLength={50} placeholder='Search any user' />
        </InputGroup>
      </Box>

      <Flex gap={'2rem'} fontSize={'1.5rem'} color={'black'}>
        <IoChatbubblesOutline color={'gray'} cursor={'pointer'} />
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
            <MenuItem gap={'1rem'}>
              <IoSettingsOutline />
              Settings
            </MenuItem>

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
