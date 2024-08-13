import { Button, Center, createLocalStorageManager, Flex, Input, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { MdOutlineSettings } from 'react-icons/md'
import { useSelector } from 'react-redux'

import DeleteUserAccount from '../screens/DeleteUserAccounts.jsx'
import { Link } from 'react-router-dom'
const UserSettingModal = () => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const { authUser } = useSelector(store => store.user)
    

    return (
        <Center h={'90vh'} w={'100vw'} >
            <Flex flexDir={'column'} w={'50%'} p={'1rem'} h={'90%'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
                <Flex alignItems={'center'} alignSelf={'center'} fontWeight={'bold'} fontSize={'1.3rem'} gap={'.3rem'} >
                    <MdOutlineSettings />
                    <Text>Setting</Text>
                </Flex>
                <Flex flexDir={'column'}>
                    <Button w={'fit-content'}>change Email address</Button>
                    <Button w={'fit-content'}>change password</Button>
                    <Button w={'fit-content'}>Privacy</Button>
                    <Button w={'fit-content'}>Feedback</Button>
                    <Link to={`/${authUser?._id}/account-delete`}>
                    <Button color={'red'}>Delete Account</Button>
                    </Link>
                </Flex>
            </Flex>

        </Center>
    )
}
export default UserSettingModal


