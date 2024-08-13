import { Button, Center, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <Center h={'90vh'}>
            <VStack flexDir={'column'} w={'70%'} gap={'3rem'} p={'1rem'} h={'fit-content'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
                <VStack>
                    <Heading fontSize={'4rem'}>404</Heading>
                    <Heading>Page Not Found!</Heading>
                    <Text fontSize={'1.1rem'}>Oops! The page you are looking for does not exist, check the URL </Text>
                </VStack>
                <Link to={'/user/login'}>
                    <Flex fontWeight={'bold'} alignItems={'center'} gap={'1rem'} border={'1px solid black'} p={'.3rem 1rem'}>
                        Go back to login page
                        <MdOutlineArrowOutward />
                    </Flex>
                </Link>
            </VStack>
        </Center>
    )
}

export default PageNotFound
