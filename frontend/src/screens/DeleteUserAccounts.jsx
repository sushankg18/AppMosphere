import { Box, Button, Center, Flex, Heading, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DeleteUserAccounts = () => {
    const [isPassMatched, setIsPassMatched] = useState(false)
    const [password, setPassword] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()
    const navigate = useNavigate()
    const cancelRef = React.useRef()
    const { authUser } = useSelector(store => store.user)

    const handleCheckPassword = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/user/${authUser?._id}/passwordchecker`, {
                password: password
            }, {
                withCredentials: true
            })
            setIsPassMatched(true)
            toast({
                title: response.data.message,
                duration: 2000,
                position: 'top',
                status: "success"
            })
            console.log("Password matched through frontend", response.data.message)
        } catch (error) {
            console.log("error while matching password : ", error)
            toast({
                title: error.response.data.message,
                duration: 2000,
                position: 'top',
                status: "error"
            })
            setIsPassMatched(false)
        }

    }

    const handleUserAccountDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/user/delete/${authUser?._id}`);
            console.log("Account Deleted through frontend : ", res)
            toast({
                title: res.data.message,
                status: "success",
                duration: 2000,
                position: "top",

            })
            window.location.href = '/user/login';
        } catch (error) {
            console.log("Error while deleting account through frontend : ", error)
        }

    }
    return (
        <Center h={'90vh'} w={'100vw'}>
            <Flex flexDir={'column'} w={'30%'} gap={'3rem'} p={'1rem'} h={'fit-content'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
                <Heading alignSelf={'center'}>Account Deletion</Heading>

                <Flex flexDir={'column'} gap={'.3rem'}  >
                    <Text fontSize={'.9rem'} pl={'.3rem'}>Confirm your password before deleting your account</Text>
                    <Input placeholder='password' isDisabled={isPassMatched ? true : false} onChange={(e) => setPassword(e.target.value)} value={password} />
                </Flex>
                {
                    isPassMatched
                        ?
                        <Button colorScheme='red' onClick={onOpen}>
                            Delete Account
                        </Button>
                        :
                        <Button colorScheme='teal' onClick={handleCheckPassword}>
                            Verify password
                        </Button>
                }
            </Flex>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Account
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleUserAccountDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Center>
    )
}

export default DeleteUserAccounts
