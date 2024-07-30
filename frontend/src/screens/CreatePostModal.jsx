import React, { useEffect, useState } from 'react'
import {
  Box, Button, Circle, Flex, Image,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure,
  Input,
  Tooltip,
  Textarea,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { MdOutlineInsertPhoto } from "react-icons/md";
import axios from 'axios';

const CreatePostModal = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { authUser } = useSelector(store => store.user)
  if (!authUser) return;
  const handlePost = async() => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/post/createpost/${authUser?.id}` ,{
        title
      },{
        headers : {
          "Content-Type" : "application/json"
        },withCredentials : true
      })

      console.log("Got response of creating post through frontend : ",response.data)
      
    } catch (error) {
      console.log("Error while creating post through frontend : ",error)
    }
  }  
  return (
    <>
      <Box w={'100%'} h={'fit-content'} borderBottom={'1px solid #dadada'} py={'.5rem'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Circle w={'2.5rem'} h={'2.5rem'} overflow={'hidden'}>
            <Image src={authUser?.profilePhoto}  objectFit={'cover'} w={'100%'} h={'100%'}/>
          </Circle>

          <Box w={'80%'} p={'0 1rem'} onClick={onOpen} cursor={'text'}>Start a thread...</Box>
          <Button bgColor={'black'} onClick={onOpen} variant={'unstyled'} p={'0rem 1rem'} color={'white'}>Post</Button>
        </Flex>
      </Box>

      <Modal closeOnOverlayClick={false} size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalBody pb={6} >

            <Flex alignItems={'flex-start'} gap={'1rem'}>

              <Circle w='2.5rem' overflow={'hidden'}>
                <Image src={authUser?.profilePhoto} />
              </Circle>

              <Textarea type={''} onChange={(e)=> setTitle(e.target.value)} value={title} placeholder='Start a thread...' variant={'unstyled'} rows={'2'} />

              <Tooltip label='add photo' fontSize={'.7rem'}>
                <Box as='button'>
                  <MdOutlineInsertPhoto fontSize={'1.2rem'} />
                </Box>
              </Tooltip>

            </Flex>

          </ModalBody>
          {/* <ModalCloseButton /> */}

          <ModalFooter>
            <Button variant={'unstyled'} onClick={handlePost} fontSize={'.9rem'} bgColor={'black'} color={'white'} px={'1rem'} mr={3}>
              Post
            </Button>
            <Button variant={'unstyled'} fontSize={'.9rem'} bgColor={'red'} color={'white'} px={'1rem'} onClick={onClose}>Discard</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePostModal
