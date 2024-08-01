import React, { useEffect, useRef, useState } from 'react'
import {
  Box, Button, Circle, Flex, Image,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure,
  Input,
  Tooltip,
  Textarea,
  Avatar,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { MdOutlineInsertPhoto } from "react-icons/md";
import axios from 'axios';

const CreatePostModal = () => {
  const [title, setTitle] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  const [file, setFile] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  const { authUser } = useSelector(store => store.user)
  if (!authUser) return;
  
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (file) {
        formData.append("post", file);
      }

      const response = await axios.post(`http://localhost:8080/api/v1/post/createpost/${authUser?._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }, withCredentials: true
      })

      console.log("Got response of creating post through frontend : ", response.data)

    } catch (error) {
      console.log("Error while creating post through frontend : ", error)
    }
  }

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePostImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  return (
    <>
      <Box w={'100%'} h={'fit-content'} py={'.5rem'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Circle w={'2.5rem'} h={'2.5rem'} overflow={'hidden'}>
            <Image src={authUser?.profilePhoto} objectFit={'cover'} w={'100%'} h={'100%'} />
          </Circle>

          <Box w={'80%'} p={'0 1rem'} onClick={onOpen} cursor={'text'}>Start a thread...</Box>
          <Button bgColor={'black'} onClick={onOpen} variant={'unstyled'} p={'0rem 1rem'} color={'white'}>Post</Button>
        </Flex>
      </Box>

      <Modal closeOnOverlayClick={false} size={'lg'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalBody pb={6}  >

            <Flex alignItems={'flex-start'} mb={'1rem'} gap={'1rem'}>

              <Avatar w='2.5rem' h={'2.5rem'} src={authUser?.profilePhoto} overflow={'hidden'} />

              <Textarea
                ref={textareaRef}
                value={title}
                onChange={handleChange}
                placeholder="Start a thread...."
                resize="none"
                overflow="hidden"
                rows={1}
                style={{ minHeight: "auto", maxHeight: "auto", overflowY: "hidden" }}
              />
              <Tooltip label='add photo' fontSize={'.7rem'}>
                <Box as='button'>
                  <Input onChange={handlePostImage} type='file' accept='image/jpg , image/png' display={'none'} id='postPhoto' />
                  <label htmlFor='postPhoto' style={{cursor : "pointer"}} >
                    <MdOutlineInsertPhoto fontSize={'1.7rem'}  />
                  </label>
                </Box>
              </Tooltip>

            </Flex>

            <Flex alignSelf={'center'} justifyContent={'center'}>
              <Image src={previewImage} w={'15rem'} />
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
