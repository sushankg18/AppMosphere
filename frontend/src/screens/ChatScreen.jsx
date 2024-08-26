import { useEffect, useRef, useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Flex,
    Text,
    Avatar,
    HStack,
    VStack,
    Heading,
    Input,
    Box,
    InputGroup,
    InputRightElement,
    Center,
    AvatarBadge,
} from '@chakra-ui/react'
import { IoChatbubblesOutline, IoChevronBack } from 'react-icons/io5'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';
import Loader from '../components/Loader';

const ChatScreen = () => {
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const dispatch = useDispatch()
    const { authUser, otherUsers, selectedUser, OnlineUsers } = useSelector(store => store.user)
    const { messages } = useSelector(store => store.message)
    // if(messages) console.log("Messages redux found : ",messages)
    const selectUserChat = async (user) => {
        dispatch(setSelectedUser(user))

    }
    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                setLoading(true)
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/message/${authUser?._id}/${selectedUser?._id}`, {
                        withCredentials: true
                    })
                    dispatch(setMessages(response.data.gotConversation.messages))
                    setLoading(false)
                }
                catch (error) {
                    console.log("Error while fetching messages through frontend : ", error)
                    dispatch(setMessages(null))
                    setLoading(false)
                }
            }
            fetchMessages()
        }
    }, [selectedUser]);

    const handleSendMessages = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/message/${authUser?._id}/${selectedUser?._id}`, {
                message: newMessage
            }, { withCredentials: true })
            console.log("Sent the message through frontend : ", response.data.newMessage)
            dispatch(setMessages([...messages, response.data.newMessage]))
            setNewMessage('')
        } catch (error) {
            console.log("Error while sending the message through frontend : ", error)
        }
    }

    return (
        <>
            <IoChatbubblesOutline onClick={onOpen} color={'gray'} cursor={'pointer'} />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={'xl'}

            >
                <DrawerOverlay />
                <DrawerContent>

                    <DrawerBody display={'flex'} >
                        <Flex flexDir={'column'} py={'.8rem'} w={'30%'} h={'100%'} borderRight={'1px solid #adadad'}>
                            <HStack fontSize={'1.3rem'} mb={'2rem'}>
                                <IoChevronBack fontWeight={'bold'} cursor={'pointer'} onClick={onClose} />
                                <Text fontWeight={'bold'}>{authUser?.username}</Text>
                            </HStack>
                            {
                                otherUsers?.map((user, idx) => {
                                    const isOnline = OnlineUsers && OnlineUsers.includes(user?._id)
                                    console.log("ONLINE USERS : ",OnlineUsers)
                                    return (
                                        <Flex onClick={() => selectUserChat(user)} bgColor={selectedUser?._id === user._id ? "#f2f2f2" : null} cursor={'pointer'} p={'.5rem'} _hover={{ bgColor: "#f2f2f2" }} alignItems={'center'} gap={'.5rem'} >
                                            <Avatar w={'2.5rem'} h={'2.5rem'} src={user?.profilePhoto} >
                                                {
                                                    isOnline &&
                                                    <AvatarBadge boxSize='.9rem' bg='green.500' />
                                                }
                                            </Avatar>
                                            <Flex flexDir={'column'}>
                                                <Text fontWeight={'bold'}>{user?.username}</Text>
                                                <Text fontSize={'.9rem'} color={'gray'}>your last message..</Text>
                                            </Flex>
                                        </Flex>
                                    )
                                })
                            }
                        </Flex>
                        {
                            selectedUser ?
                                <Flex w={'70%'} flexDir={'column'} justifyContent={'space-between'} p={'.5rem .3rem'} >


                                    <Flex justifyContent={'space-between'} alignItems={'center'} p={'.3rem .5rem'} h={'fit-content'} >
                                        <HStack >
                                            <Avatar w={'2.5rem'} h={'2.5rem'} src={selectedUser?.profilePhoto} />
                                            <Text fontSize={'1.1rem'} fontWeight={'bold'}>{selectedUser?.username}</Text>
                                        </HStack>
                                        <Box fontSize={'1.5rem'}>
                                            <IoIosInformationCircleOutline />
                                        </Box>
                                    </Flex>

                                    <Flex my={'.7rem'} gap={'.7rem'} justifyContent={'flex-end'} p={'.6rem'} flexDir={'column'} w={'100%'} overflowY={'auto'} minH={'80%'} maxH={'100%'}>
                                        {loading ? <Loader /> : messages ?
                                            messages?.map((item, idx) => {
                                                const isUserSender = authUser?._id === item.senderId
                                                return (
                                                    <Flex
                                                        alignSelf={isUserSender ? "flex-end" : "flex-start"}
                                                        justifyContent={isUserSender ? 'flex-end' : "flex-start"}
                                                        w={'60%'}>
                                                        <Text
                                                            key={idx}
                                                            borderRadius={'.9rem'}
                                                            bgColor={isUserSender && "#3797F0"}
                                                            color={isUserSender && "white"}
                                                            alignSelf={isUserSender ? 'flex-end' : "flex-start"}
                                                            w={'fit-content'}
                                                            p={'.3rem 1rem'}
                                                            h={'fit-content'}
                                                            border={'1px solid #adadad'}>
                                                            {item.message}
                                                        </Text>
                                                    </Flex>
                                                )
                                            }) :
                                            <Center h={'100%'}>
                                                <Text>Keep your ego aside and start the chat 😊</Text>
                                            </Center>
                                        }
                                    </Flex>

                                    <Flex >
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                placeholder='Message...'
                                                borderColor={'#adadad'}
                                                focusBorderColor='#adadad'
                                                borderRadius={'1rem'}
                                                value={newMessage}
                                                onChange={(e) => { setNewMessage(e.target.value) }}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button onClick={handleSendMessages} variant={'unstyled'} color={'#0033cc'} fontWeight={'bold'} h='1.75rem' size='sm' >
                                                    Send
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </Flex>

                                </Flex>
                                :
                                <Flex w={'70%'} alignItems={'center'} justifyContent={'center'} h={'100%'} >
                                    <VStack>
                                        <IoChatbubblesOutline color={'gray'} fontSize={'3rem'} />
                                        <Text>Send a message to start a chat.</Text>
                                    </VStack>
                                </Flex>
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ChatScreen
