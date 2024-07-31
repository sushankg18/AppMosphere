import { Avatar, Box, Button, Center, Divider, Flex, Image, Input, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import post from '../assets/randomPost1.jpg'
import Stories from './Stories';
import CreatePostModal from '../screens/CreatePostModal.jsx';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';

const PostSection = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [newComment, setNewComment] = useState('')
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/post/getposts");
        console.log("Got all posts through frontend : ", response.data.posts);
        setUserPosts(response.data.posts);
      } catch (error) {
        console.log("Got error while getting posts through frontend ! ", error);
      }
    };
    getPosts();
  }, []);

  const toggleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/post/like/${postId}/${authUser?._id}`);
      console.log("Toggled like through frontend", response);

      setUserPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const isLiked = post.likes.includes(authUser._id);
            const newLikes = isLiked
              ? post.likes.filter((like) => like !== authUser._id)
              : [...post.likes, authUser._id];
            return { ...post, likes: newLikes };
          }
          return post;
        })
      );
    } catch (error) {
      console.log("Not toggled like on frontend", error);
    }
  };

  const togglePostComment = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/post/comment/${postId}/${authUser?._id}`, {
        comment: newComment
      }, {
        headers: {
          "Content-Type": "application/json"
        }, withCredentials: true
      })
      console.log("Got comment through frontend : ", response);


    } catch (error) {
      console.log("Not toggled comment on frontend : ", error)
    }
  }
  return (
    <Center w={'50%'} p={'1rem'} className='postSection' h={'86vh'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
      <Flex flexDir={'column'} gap={'2rem'} overflowX={'hidden'} alignItems={'center'} w={'100%'} h={'100%'} overflowY={'scroll'}>

        <Stories />
        <CreatePostModal />

        {userPosts.map((i, idx) => (
          <Flex flexDir={'column'} key={idx} w={'80%'} gap={'.7rem'}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Flex alignItems={'center'} gap={'.7rem'} >
                <Avatar size={'sm'} src={i.owner.profilePhoto} />
                <Text color={'black'} fontWeight={'600'}>{i.owner.username}</Text>
                <Text fontSize={'30px'}>&#xb7;</Text>
                <Text>{moment(i.createdAt).fromNow()} </Text>
              </Flex>
              <FiMoreHorizontal cursor={'pointer'} />
            </Flex>

            <Flex flexDir={'column'} gap={'.4rem'}>
              <Text>{i.title}</Text>
              <Image src={post} w={'30rem'} onDoubleClick={''} />
            </Flex>

            <Flex gap={'2rem'} alignItems={'flex-start'}>
              <Tooltip hasArrow label='like' aria-label='A tooltip' openDelay={'500'}>
                <Box as='button' variant={'unstyled'} onClick={() => toggleLike(i._id)}>
                  {
                    i.likes.includes(authUser._id) ?
                      <FaHeart fontSize={'1.3rem'} />
                      :
                      <FaRegHeart fontSize={'1.3rem'} />
                  }
                  <Text>{i.likes?.length || 0}</Text>
                </Box>
              </Tooltip>
              <Tooltip hasArrow label='comment' aria-label='A tooltip' openDelay={'500'}>
                <Box as='button' variant={'unstyled'} onClick={() => console.log(idx + 1)}>
                  <FaRegComment fontSize={'1.3rem'} />
                  <Text>{i.comments?.length || 0}</Text>
                </Box>
              </Tooltip>
              <Tooltip hasArrow label='share' aria-label='A tooltip' openDelay={'500'}>
                <Box as='button' variant={'unstyled'}>
                  <FiSend fontSize={'1.3rem'} />
                </Box>
              </Tooltip>
            </Flex>

            {i.comments.length < 2 &&
              i.comments.map((item, index) => {
                 return (
                  <Flex gap={'1rem'} border={'1px solid #adadad'} borderRadius={'.5rem'} p={'.4rem 1rem'}>
                    <Avatar src={authUser?.profilePhoto} w={'1.7rem'} h={'1.7rem'} />
                    <Text color={'black'}>{item.text}</Text>
                  </Flex>
                )
              })
            }

            <Flex alignItems={'center'} gap={'1rem'}>
              <Avatar w={'2rem'} h={'2rem'} src={authUser?.profilePhoto} />
              <Input focusBorderColor='#dadada' onChange={(e) => setNewComment(e.target.value)} value={newComment} variant={'flushed'} placeholder='add a comment...' />
              <Box as='button' p={'0rem .7rem'} onClick={() => togglePostComment(i._id)} fontWeight={'bold'} _hover={{ color: "#1877F2" }}>
                post
              </Box>
            </Flex>
            <Flex w={'100%'} mt={'1rem'} h={'1px '} bgColor={'#dadada'}></Flex>
          </Flex>
        ))}
      </Flex>
    </Center>
  );
};

export default PostSection;
