import { Box, Button, Center, Flex, Heading, Image, Input, InputGroup, InputLeftAddon, InputLeftElement, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import { MdFileDownloadDone } from "react-icons/md";

const ForgetPass = () => {

    const [showVerification, setShowVerification] = useState(false)

    const handleShowVerification = () => {
        setShowVerification(!showVerification)
    }
    return (
        <Center bgColor={'#fff'} h={'100vh'} gap={'2rem'} userSelect={'none'} flexDir={'column'}>

            <Flex w={'30%'} p={'2rem 1rem'} alignItems={'center'} gap={'2rem'} minH={'fit-content'} flexDir={'column'} boxShadow={'1px 1px 15px #dadada ,-1px -1px #dadada'} >
                <Flex flexDir={'column'} gap={'2rem'} color={showVerification ? 'gray' : "black"}>
                    <Heading fontSize={'2rem'} textAlign={'center'} >Forget Password</Heading>
                    <Flex flexDir={'column'} fontWeight={'bold'} alignItems={'center'} fontSize={'1.1rem'}>
                        <Text>Please enter your email</Text>
                        <Text>You will recieve an OTP on your gmail.</Text>
                    </Flex>
                    <Flex gap={'1rem'}>
                        <InputGroup  >
                            <InputLeftElement>
                                <MdOutlineEmail />
                            </InputLeftElement>
                            <Input borderWidth={'3px'} isDisabled={showVerification ? true : false} />
                        </InputGroup>
                    </Flex>

                    <Flex justifyContent={'center'}>
                        <Button
                            isDisabled={showVerification ? true : false}
                            color={showVerification ? 'white' : "white"}
                            rightIcon={showVerification ? <MdFileDownloadDone /> :<AiOutlineSend />} p={'.3rem 2rem'}
                            bgColor={showVerification ? 'green' : 'black'} _hover={{ backgroundColor: "#404040" }}
                            onClick={handleShowVerification} >{showVerification ? "Otp sent" : `Send otp `}
                        </Button>
                    </Flex>
                </Flex>
                {
                    showVerification &&
                    (
                        <>
                            <Heading fontSize={'2rem'}>Otp verification</Heading>
                            <Flex gap={'1rem'} >
                                <Input maxLength={1} fontSize={'1.1rem'} w={'3.5rem'} borderWidth={'3px'} />
                                <Input maxLength={1} fontSize={'1.1rem'} w={'3.5rem'} borderWidth={'3px'} />
                                <Input maxLength={1} fontSize={'1.1rem'} w={'3.5rem'} borderWidth={'3px'} />
                                <Input maxLength={1} fontSize={'1.1rem'} w={'3.5rem'} borderWidth={'3px'} />
                            </Flex>
                            <Flex justifyContent={'center'}>
                                <Button p={'.3rem 2rem'} bgColor={'#000'} color={'#fff'} _hover={{ backgroundColor: "#404040" }}> Verify Otp</Button>
                            </Flex>
                        </>
                    )
                }
            </Flex>
        </Center >
    )
}

export default ForgetPass
