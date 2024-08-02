import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Box,
    Image,
    Flex,
    Avatar,
    Input,
} from '@chakra-ui/react'
import { FaRegHeart } from 'react-icons/fa6'
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';


const PostDeatilsModal = ({ message, setUserPosts, likes, postId, comments, post, date, userProfile, postUsername, caption }) => {

    const [newComment, setNewComment] = useState('')
    const [commentReply, setCommentReply] = useState('')
    const [replyTo, setReplyTo] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { authUser } = useSelector(store => store.user)

    const togglePostComment = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/post/comment/${postId}/${authUser?._id}`, {
                comment: newComment
            }, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            });

            console.log("Got comment through frontend : ", response);

            setUserPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post._id === postId) {
                        const newComments = [...post.comments, { userId: authUser._id, comment: newComment, username: authUser.username }];
                        return { ...post, comments: newComments };
                    }
                    return post;
                })
            );

            setNewComment("");
        } catch (error) {
            console.log("Not toggled comment on frontend : ", error);
        }
    }

    const handleReply = async (username) => {
        setCommentReply(`@${username} `)
        setReplyTo(`@${username}`)
    }
    const toggleReplyComment = async () => {

    }
    return (
        <Box >
            <Text cursor={'pointer'} onClick={onOpen}>{message}</Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW={post ? '70%' : "40%"} h={'82vh'} overflow={'hidden'} >
                    <ModalCloseButton />


                    <ModalBody display={'flex'}  >

                        {
                            post && (

                                <Box width={'50%'} h={'35rem'} >
                                    <Image src={post} w={'100%'} h={'100%'} objectFit={'contain'} />
                                </Box>
                            )
                        }

                        <Flex justifyContent={'space-between'} h={"80vh"} px={'.5rem'} flexDir={'column'} width={post ? '50%' : "100%"} >
                            <Flex flexDir={'column'} borderBottom={'1px solid #dadada'} py={post ? '.2rem' : "1rem"}>
                                <Flex alignItems={'center'} gap={'.5rem'}>
                                    <Avatar w={'2.3rem'} h={'2.3rem'} src={userProfile} />
                                    <Text fontWeight={'bold'}>{postUsername}</Text>
                                    <Text fontSize={'30px'}>&#xb7;</Text>
                                    <Text>{date}</Text>
                                </Flex>
                                <Text>{caption}</Text>
                            </Flex>

                            <Flex flexDir={'column'} h={'100%'} overflowY={'auto'} gap={'1rem'} py={post ? '.2rem' : "1rem"}>
                                {
                                    comments.map((item, idx) => {
                                        return (

                                            <Flex alignItems={'center'} justifyContent={'space-between'} p={'.5rem 1rem'}>

                                                <Flex gap={'.9rem'} alignItems={'center'}>

                                                    <Avatar w={'2.5rem'} h="2.5rem" src={item.user.profilePhoto} />

                                                    <Flex flexDir={'column'}>
                                                        <Flex gap={'.5rem'} fontSize={'1.1rem'}>
                                                            <Text fontWeight={'bold'}>{item.user.username}</Text>
                                                            <Text>{item.text}</Text>
                                                        </Flex>
                                                        <Flex gap={'.8rem'} fontSize={'.9rem'} color={'gray'}>
                                                            <Text>{moment(item.createdAt).fromNow()}</Text>
                                                            <Text fontWeight={'bold'}>like</Text>
                                                            <Text cursor={'pointer'} fontWeight={'bold'} onClick={() => handleReply(item._id)}>reply</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>

                                                <Flex>
                                                    <FaRegHeart />
                                                </Flex>
                                            </Flex>
                                        )
                                    })
                                }
                            </Flex>

                            {
                                commentReply.length > 0 ?
                                    <Flex flexDir={'column'}>
                                        <Text bgColor={'#f5f5f5'} fontWeight={'bold'} w={'fit-content'} p={'.2rem 1rem'} fontSize={'.9rem'}>reply to {replyTo}</Text>
                                        <Flex>
                                            <Input onChange={(e) => setCommentReply(e.target.value)} value={commentReply} focusBorderColor='#adadad' variant={'flushed'} placeholder='Add a comment...' />
                                            <Button onClick={() => toggleReplyComment(postId)}>Post</Button>
                                        </Flex>
                                    </Flex> :
                                    <Flex>
                                        <Input onChange={(e) => setNewComment(e.target.value)} value={newComment} focusBorderColor='#adadad' variant={'flushed'} placeholder='Add a comment...' />
                                        <Button onClick={() => togglePostComment(postId)}>Post</Button>
                                    </Flex>
                            }


                        </Flex>


                    </ModalBody>







                    {/* <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </Box>
    )


}

export default PostDeatilsModal
