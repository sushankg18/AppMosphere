import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineSettings } from 'react-icons/md'

const UserSettingModal = () => {
    return (
        <Center h={'90vh'} w={'100vw'} >
            <Flex flexDir={'column'} w={'50%'} p={'1rem'} h={'90%'} boxShadow={'rgba(14, 30, 37, .1) 0px 2px 4px 0px, rgba(14, 30, 37, 0.1) 0px 2px 16px 0px'}>
                <Flex alignItems={'center'} alignSelf={'center'} fontWeight={'bold'} fontSize={'1.3rem'} gap={'.3rem'} >
                    <MdOutlineSettings />
                    <Text>Setting</Text>
                </Flex>
            </Flex>

        </Center>
    )
}

export default UserSettingModal
