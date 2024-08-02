import { Box, Button, Center, Circle, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SuggestionBox = () => {
  const { otherUsers } = useSelector(store => store.user)
  if (!otherUsers) return;
  return (
    <Box w={'24%'} maxH={'85vh'} minH={'fit-content'} p={'1rem'} display={'flex'} overflow={'hidden'} flexDir={'column'} gap={'1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
      <Center h={'10%'}>
        <Heading fontSize={'1.3rem'}>Suggestions</Heading>
      </Center>
      <Flex flexDir={'column'} overflowY={'auto'} h={'90%'} gap={'1rem'}>
        {
          otherUsers.map((item, idx) => {
            return (
              <>
                <Flex p={'.4rem .5rem'} gap={'.7rem'} alignItems={'center'} key={idx}>
                  <Circle w={'3rem'} h={'3rem'} overflow={'hidden'}>
                    <Image src={item?.profilePhoto} w={'100%'} h={'100%'} objectFit={'cover'} />
                  </Circle>

                  <Flex justifyContent={'space-between'} gap={'.3rem'} minW={'80%'}>
                    <Link to={`/${item.username}`}  style={{ width : "70%"}}>
                      <Text  fontWeight={'bold'}  noOfLines={'1'} color={'black'}>{item?.username}</Text>
                    </Link>
                    <Button bgColor={'black'} color={'white'} _hover={{ bgColor: "rgb(70, 70, 70)" }} p={' .9rem'} fontSize={'.9rem'} size={'xs'} fontWeight={'bold'}>Follow</Button>
                  </Flex>
                </Flex>

              </>
            )
          })
        }
      </Flex>
    </Box>
  )
}

export default SuggestionBox
