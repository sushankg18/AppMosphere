import { Box, Center, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiSolidError } from "react-icons/bi";

const Error = () => {
    return (
        <Center h={'90vh'}>
            <VStack>
                <BiSolidError />
                <Heading>Error while Loading your data....</Heading>
            </VStack>
        </Center>
    )
}

export default Error
