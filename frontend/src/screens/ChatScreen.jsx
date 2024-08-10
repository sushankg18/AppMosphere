import { useRef } from 'react'
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
} from '@chakra-ui/react'
import { IoChatbubblesOutline, IoChevronBack } from 'react-icons/io5'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ChatScreen = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const { authUser, otherUsers } = useSelector(store => store.user)
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
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <HStack>
                            <IoChevronBack cursor={'pointer'} onClick={onClose} />
                            <Text fontWeight={'bold'}>{authUser?.username}</Text>
                        </HStack>
                    </DrawerHeader>

                    <DrawerBody display={'flex'} >
                        <Flex flexDir={'column'} gap={'1rem'} w={'30%'} h={'100%'} borderRight={'1px solid #adadad'}>

                            {
                                otherUsers?.map((user, idx) => {
                                    return (
                                        <Flex cursor={'pointer'} p={'.3rem .5rem'} _hover={{bgColor : "#f2f2f2"}} alignItems={'center'} gap={'.5rem'} >
                                            <Avatar w={'2.5rem'} h={'2.5rem'} src={user?.profilePhoto} />
                                            <Flex flexDir={'column'}>
                                                <Text fontWeight={'bold'}>{user?.username}</Text>
                                                <Text fontSize={'.9rem'} color={'gray'}>your last message..</Text>
                                            </Flex>
                                        </Flex>
                                    )
                                })
                            }
                        </Flex>
                        <Flex w={'70%'} alignItems={'center'} justifyContent={'center'} h={'100%'} >
                            <VStack>
                                <IoChatbubblesOutline color={'gray'} fontSize={'3rem'} />
                                <Text>Send a message to start a chat.</Text>
                            </VStack>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ChatScreen
