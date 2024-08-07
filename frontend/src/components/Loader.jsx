import { Box, Center, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
    return (
        <Center h={'90vh'}>
            <Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='purple.300'
                size='xl' />
        </Center>
    )
}

export default Loader
