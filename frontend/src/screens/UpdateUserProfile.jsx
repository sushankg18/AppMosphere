import React, { useEffect, useRef, useState } from 'react'
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
    Circle,
    Avatar,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { TbCameraUp } from "react-icons/tb";
import axios from 'axios';

const UpdateUserProfile = () => {
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [file, setFile] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { authUser } = useSelector(store => store.user)
    const [profilePhoto, setProfilePhoto] = useState(authUser?.profilePhoto)
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    
    const handleUpdaterProfile = async () => {
        try {
            const formData = new FormData();

            if (username) formData.append("username", username);
            if (bio) formData.append("bio", bio)
            if (file) formData.append("profilePhoto", file)

            const response = await axios.put(`http://localhost:8080/api/v1/user/update/${authUser?._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }, withCredentials: true
            })
            console.log("Updated profile through frontend : ", response)
        } catch (error) {
            console.log("Error while updating profile through frontend : ", error)
        }
    }
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFile(file)
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
                    <ModalHeader margin={'auto'}>UPDATE PROFILE</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} display={'flex'} flexDir={'column'} gap={'2rem'}>
                        <FormControl display={'flex'} w={'fit-content'} alignSelf={'center'} gap={'1rem'} flexDir={'column'} alignItems={'center'}>
                            <Avatar w={'6rem'} h={'6rem'} src={profilePhoto} overflow={'hidden'} userSelect={'none'} />
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
                                <Input ref={initialRef} onChange={(e) => setUsername(e.target.value)} value={username.toLowerCase()} placeholder={authUser?.username} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Bio</FormLabel>
                                <Input onChange={(e)=> setBio(e.target.value)} value={bio} placeholder='change your bio...' />
                            </FormControl>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleUpdaterProfile} colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default UpdateUserProfile
