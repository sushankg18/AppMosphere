import React, { useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Image,
    Flex,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { TbCameraUp } from "react-icons/tb";

const UpdateUserProfile = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { authUser } = useSelector(store => store.user)
    const [profilePhoto, setProfilePhoto] = useState(authUser?.profilePhoto)
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            console.log("Image url is : ", file)
            setProfilePhoto(URL.createObjectURL(file));
        }
    };

    if (!authUser) return;
    return (
        <Box w={'100%'}> 
            <Text onClick={onOpen}>Update Profile</Text>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>UPDATE PROFILE</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} display={'flex'} flexDir={'column'} gap={'2rem'}>
                        <FormControl display={'flex'} w={'fit-content'} alignSelf={'center'} gap={'1rem'} flexDir={'column'} alignItems={'center'}>
                            <Box w={'7rem'} h={'7rem'} userSelect={'none'}>
                                <Image
                                    borderRadius={'50%'}
                                    w={'100%'}
                                    height={'100%'}
                                    objectFit={'cover'}
                                    ref={initialRef}
                                    src={profilePhoto}
                                    position={'relative'}
                                    border={'1px solid black'}
                                />
                            </Box>
                            <Input onChange={handleFileChange} type='file' accept='image/png , image/jpeg' display={'none'} id='profilepic' />
                            <Box w={'fit-content'}                             >
                                <Button as={'label'} leftIcon={<TbCameraUp />} colorScheme='green' fontSize={'.9rem'} p={'0 .5rem'} cursor={'pointer'} for="profilepic">
                                    Change photo
                                </Button>
                            </Box>
                        </FormControl>

                        <Flex flexDir={'column'}>
                            <FormControl>
                                <FormLabel>username</FormLabel>
                                <Input ref={initialRef} placeholder={authUser?.username} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Bio</FormLabel>
                                <Input placeholder='Last name' />
                            </FormControl>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose }>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default UpdateUserProfile
