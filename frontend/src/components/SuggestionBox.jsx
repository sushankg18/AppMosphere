import { Box, Button, Center, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const SuggestionBox = () => {
  const { otherUsers } = useSelector(store => store.user)
  if (!otherUsers) return;
  return (
      <Box w={'20%'}  h={'70vh'} p={'1rem'} display={'flex'} flexDir={'column'} gap={'1rem'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
        <Center h={'10%'}>
          <Heading fontSize={'1.3rem'}>Suggestions</Heading>
        </Center>
        <Flex flexDir={'column'} h={'90%'} gap={'1rem'}>
          {
            otherUsers.map((item, idx) => {
              return (
                <Flex  p={'.4rem .5rem'} gap={'1rem'} alignItems={'center'}>
                  <Box>
                    <Image src={item.profilePhoto} w={'3rem'} />
                  </Box>
                  <Flex justifyContent={'space-between'} gap={'.3rem'} w={'full'}>
                    <Text color={'black'}>{item.username}</Text>
                    <Button bgColor='rgb(28, 139, 247)' color={'white'} _hover={{bgColor : "#1877F2"}}  p={' .9rem'} fontSize={'.9rem'} size={'xs'} fontWeight={'bold'}>Follow</Button>
                  </Flex>
                </Flex>
              )
            })
          }
        </Flex>
      </Box>
  )
}

export default SuggestionBox
