import { Avatar, Box, Button, Center, Divider, Flex, Image, Input, Text, Tooltip } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import post from '../assets/randomPost1.jpg'
import Stories from './Stories';
import CreatePostModal from '../screens/CreatePostModal.jsx';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import PostDeatilsModal from '../screens/PostDeatilsModal.jsx';
import { Link } from 'react-router-dom';
import Loader from './Loader.jsx';

const PostSection = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false);
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      try {
        const response = await axios.get("http://localhost:8080/api/v1/post/getposts");
        setUserPosts(response.data.posts);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("Got error while getting posts through frontend ! ", error);
      }
    };
    getPosts();
  }, []);

  const toggleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/post/like/${postId}/${authUser?._id}`);

      setUserPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const isLiked = post.likes.includes(authUser._id);
            const newLikes = isLiked ? post.likes.filter((like) => like !== authUser._id) : [...post.likes, authUser._id];
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


  const deletePost = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/post/deletepost/${postId}/${authUser?._id}`)
      console.log("Deleted post from frontend : ", response)
    } catch (error) {
      console.log("Error while deleting the post from frontend : ", error)
    }
  }
  return (
    loading ? <Loader /> :

      <Center w={'50%'} p={'1rem'} className='postSection' h={'86vh'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
        <Flex flexDir={'column'} gap={'2rem'} overflowX={'hidden'} alignItems={'center'} w={'100%'} h={'100%'} overflowY={'scroll'}>

          <Stories />
          <CreatePostModal />

          {userPosts?.map((i, idx) => (
            <Flex border={'1px solid #dadada'} p={'.3rem 1rem'} borderRadius={'.5rem'} flexDir={'column'} key={idx} w={'83%'} gap={'.7rem'}>
              <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex alignItems={'center'} gap={'.7rem'} >
                  <Link to={`/${i?.owner?.username}`}>
                    <Flex gap={'.7rem'} alignItems={'center'}>
                      <Avatar size={'sm'} src={i?.owner?.profilePhoto} />
                      <Text color={'black'} fontWeight={'600'}>{i?.owner?.username}</Text>
                    </Flex>
                  </Link>
                  <Text fontSize={'30px'}>&#xb7;</Text>
                  <Text>{moment(i.createdAt).fromNow()} </Text>
                </Flex>


                <Menu >
                  <MenuButton
                    aria-label='Options'
                    variant='outline'
                  >
                    <FiMoreHorizontal />
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<MdOutlineEdit />} >
                      edit
                    </MenuItem>
                    <MenuItem color={'red'} icon={<AiOutlineDelete />} onClick={() => deletePost(i._id)}>
                      delete post
                    </MenuItem>
                    <MenuItem icon={<IoIosArrowBack />}>
                      cancel
                    </MenuItem>
                  </MenuList>
                </Menu>


              </Flex>

              <Flex flexDir={'column'} gap={'.4rem'}>
                <Text fontSize={'1.1rem'}>{i.title}</Text>
                <Flex justifyContent={'center'}>
                  {
                    i.video && <video src={i.video} style={{aspectRatio : '9/12'}}  controls></video>
                  }
                  {
                    i.post &&<Image src={i.post} w={'20rem'} />
                  }
                </Flex>
              </Flex>

              <Flex gap={'2rem'} justifyContent={'space-between'} pb={'1rem'}>

                <Flex gap={'2rem'}>

                  <Tooltip hasArrow label='like'  aria-label='A tooltip' openDelay={'1000'}>
                    <Box as='button' position={'relative'} variant={'unstyled'}  >
                      {
                        i.likes.includes(authUser?._id) ?
                          <FaHeart onClick={() => toggleLike(i._id)} fontSize={'1.2rem'} />
                          :
                          <FaRegHeart onClick={() => toggleLike(i._id)} fontSize={'1.2rem'} />
                      }
                      <Flex position={'absolute'} gap={'.3rem'} py={'.2rem'} width={'fit-content'} fontSize={'.9rem'} fontWeight={'bold'}>
                        <Text>{i.likes?.length || 0}</Text>
                        <Text> likes</Text>
                      </Flex>
                    </Box>
                  </Tooltip>
                  <Tooltip hasArrow label='comment' aria-label='A tooltip' openDelay={'500'}>
                    <Box as='button' variant={'unstyled'} >
                      <FaRegComment fontSize={'1.2rem'} />
                    </Box>
                  </Tooltip>
                  <Tooltip hasArrow label='share' aria-label='A tooltip' openDelay={'500'}>
                    <Box as='button' variant={'unstyled'}>
                      <FiSend fontSize={'1.2rem'} />
                    </Box>
                  </Tooltip>
                </Flex>

                <Flex>
                  <Tooltip hasArrow label='save' aria-label='A tooltip' openDelay={'500'}>
                    <Flex alignSelf={'flex-end'} as='button' variant={'unstyled'}>
                      <FaRegBookmark fontSize={'1.2rem'} />
                    </Flex>
                  </Tooltip>
                </Flex>
              </Flex>

              {i.comments.length < 2 ?
                i?.comments.map((item, index) => {
                  return (
                    <Flex alignItems={'center'} justifyContent={'space-between'} border={'1px solid #adadad'} borderRadius={'.5rem'} p={'.4rem 1rem'}>
                      <Flex gap={'1rem'}>
                        <Text fontWeight={'bold'}>{item.user?.username}</Text>
                        <Text >{item?.text}</Text>
                      </Flex>

                      <Flex>
                        <FaRegHeart />
                      </Flex>
                    </Flex>
                  )
                }) :
                <Flex>

                  <PostDeatilsModal
                    message={`view all ${i.comments.length} comments`}
                    postId={i?._id}
                    comments={i?.comments}
                    likes={i?.likes}
                    post={i?.post}
                    date={moment(i.createdAt).fromNow()}
                    userProfile={i.owner?.profilePhoto}
                    postUsername={i.owner?.username}
                    caption={i?.title}
                    userPosts={setUserPosts}
                  />

                </Flex>
              }

              <Flex alignItems={'center'} gap={'1rem'} mb={'.5rem'}>
                <Avatar w={'1.7rem'} h={'1.7rem'} src={authUser?.profilePhoto} />
                <Input focusBorderColor='#dadada' onChange={(e) => setNewComment(e.target.value)} variant={'flushed'} placeholder='add a comment...' />
                <Box as='button' p={'0rem .7rem'} onClick={() => togglePostComment(i._id)} fontWeight={'bold'} _hover={{ color: "#1877F2" }}>
                  post
                </Box>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Center>
  );
};

export default PostSection;
