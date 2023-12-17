import React, { useEffect, useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    FormErrorMessage,
    useToast,
    InputRightElement,
    InputGroup



} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import YupPassword from 'yup-password';
YupPassword(yup);

import { useFormik } from 'formik'
import { baseUrl } from '../utils/config';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginAction } from '../redux/slices/usersSlices';

const validationSchema = yup.object().shape({
    usernameOrEmail: yup.string().required('name Cannot be Empty').min(6),
    password: yup.string().required('length Password minimum  8 character').min(8),
})

const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('setStorage');
    const [showPasswordconfirm, setShowPasswordconfirm] = useState(false)



    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [])
    const formik = useFormik({
        initialValues: {
            usernameOrEmail: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {

            const { usernameOrEmail, password } = values;
            const isEmail = usernameOrEmail.includes("@");
            try {
                let userData;
                if (isEmail) {
                    userData = await axios.get(
                        `${baseUrl}/users?email=${usernameOrEmail}&password=${password}`
                    );
                } else {
                    userData = await axios.get(
                        `${baseUrl}/users?username=${usernameOrEmail}&password=${password}`
                    );
                }
                if (!userData.data.length) {
                    return toast({
                        title: 'username or email, pass wrong.',
                        description: "please check username or pass your account .",
                        status: 'warning',
                        duration: 9000,
                        isClosable: true,
                    });
                }
                // console.log(userData.data[0].id);
                localStorage.setItem("setStorage", JSON.stringify(userData.data[0]));
                // localStorage.setItem("setStorage", JSON.stringify({ usernameOrEmail, userid: userData.data[0].id }));

                dispatch(loginAction(userData.data[0]));
                toast({
                    title: "Login Success",
                    description: "Successful login please post your tweet.",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });

                navigate("/");
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Account cant created.',
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            }
        },
    });

    console.log(formik);
    return (





        <Flex flexDirection='column' height='max-content' p='10' justifyContent='center' alignItems='center' >
            <Stack flexDir='column' mb='2' justifyContent='center' alignItems='center'>
                <Box minW={{ base: '90%', md: '460px' }} >
                    <Stack spacing={4} p='3rem' boxShadow='dark-lg' borderRadius={20} border='-5px' alignItems='center'>
                        <Heading fontSize={{ sm: "2xl", md: "4xl", lg: "4xl" }} >
                            Sign ddyTweet
                        </Heading>
                        <Text fontSize={['sm', 'md', 'lg', 'xl']} >
                            Dont have Account ? <Link to='/register' > Register</Link>
                        </Text>
                        <form onSubmit={formik.handleSubmit} >
                            <FormControl py='3' isInvalid={Boolean(formik.errors.usernameOrEmail && formik.touched.usernameOrEmail)}>
                                {/* <FormControl isInvalid={Boolean(formik.errors.usernameOrEmail && formik.touched.usernameOrEmail)}> */}

                                <FormLabel fontSize={'sm'} >Username Or Email</FormLabel>
                                <Input type="text" name='usernameOrEmail' placeholder='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                <FormErrorMessage>{formik.errors.usernameOrEmail}</FormErrorMessage>
                            </FormControl>
                            <FormControl py='3' isInvalid={Boolean(formik.errors.password && formik.touched.password)}>
                                {/* <FormControl isInvalid={Boolean(formik.errors.password && formik.touched.password)}> */}
                                <FormLabel fontSize={'sm'} >Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPasswordconfirm ? 'text' : 'password'} name='password' placeholder='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    <InputRightElement h={'full'} >
                                        <Button rounded='10px' fontSize='10px' bg={'transparent'} color={'#39A7FF'}
                                            variant={'ghost'}
                                            onClick={() => setShowPasswordconfirm((showPasswordconfirm) => !showPasswordconfirm)}>
                                            {showPasswordconfirm ? 'hide' : 'show'}

                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10}>
                                {/* <FormHelperText color='grey.800' textAlign='center'>selamat datang</FormHelperText> */}
                                <Button bgColor='grey.800' borderRadius={5} type='submit' variant='solid' size='md' fontSize='sm'
                                    bg={'#39A7FF'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'white',
                                        color: '#39A7FF',
                                    }}>
                                    Sign in
                                </Button>

                            </Stack>
                        </form>

                    </Stack>
                </Box>
            </Stack>
        </Flex>
        //==================================================
        // <Flex

        //     align={'center'}
        //     justify={'center'}
        //     bg={useColorModeValue('gray.50', 'gray.800')}>
        //     <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

        //         <Box
        //             rounded={'lg'}
        //             bg={useColorModeValue('white', 'gray.700')}
        //             boxShadow={'lg'}
        //             p={8}>
        //             <Stack spacing={4}>
        //                 <form onSubmit={formik.handleSubmit} >
        //                     <FormControl isInvalid={Boolean(formik.errors.usernameOrEmail && formik.touched.usernameOrEmail)}>
        //                         <FormLabel>username or Email address</FormLabel>
        //                         <Input type="text" name='usernameOrEmail' placeholder='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        //                         <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        //                     </FormControl>
        //                     <FormControl isInvalid={Boolean(formik.errors.password && formik.touched.password)}>
        //                         <FormLabel>Password</FormLabel>
        //                         <Input type="password" name='password' placeholder='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        //                         <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        //                     </FormControl>
        //                     <Stack spacing={10}>
        //                         <Button
        //                             type='submit'
        //                             bg={'blue.400'}
        //                             color={'white'}
        //                             _hover={{
        //                                 bg: 'blue.500',
        //                             }}>
        //                             Sign in
        //                         </Button>
        //                     </Stack>

        //                     <Stack pt={6}>
        //                         <Text align={'center'}>
        //                             dont have account? <Link to='/register' color=''>Register</Link>
        //                         </Text>
        //                     </Stack>
        //                 </form>
        //             </Stack>
        //         </Box>
        //     </Stack>
        // </Flex>
    )
}

export default Login