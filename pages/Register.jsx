import React, { useEffect } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import * as yup from "yup"
import YupPassword from 'yup-password'
import axios from 'axios'
YupPassword(yup);
const validationSchema = yup.object().shape({
    username: yup.string().required('Name Cannot be Empty').min(6),
    email: yup.string().email("Invalid Email").required('Email is required'),
    password: yup.string().required('password cannot be empty').min(6),
    confirmpassword: yup.string('provide your password again').required('password is confirmation is required').oneOf([yup.ref('password')], 'passwords do not match'),

    // .minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordconfirm, setShowPasswordconfirm] = useState(false)

    const token = localStorage.getItem('setStorage')
    const navigate = useNavigate();
    const toast = useToast();



    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmpassword: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            // console.log('isi values', values);
            // alert(JSON.stringify(values))
            await axios.post('http://localhost:2000/users', {
                username: values.username,
                email: values.email,
                password: values.password,
            });
            resetForm();
            toast({
                title: "create Account Success",
                description: "We've created your account for you.",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        },

    });
    console.log(formik);
    return (
        <Flex
            flexDirection='column' height='max-content' p='10' justifyContent='center' alignItems='center'>
            <Stack flexDir='column' mb='2' justifyContent='center' alignItems='center'>
                <Box minW={{ base: '90%', md: '460px' }}>
                    <Stack spacing={4} p='2rem' boxShadow='dark-lg' borderRadius={20} border='-5px' alignItems='center'>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up ddyTweet
                        </Heading>
                        <Text fontSize={['sm', 'md', 'lg', 'xl']} >
                            Have account? <Link to='/login'>Login</Link>
                        </Text>
                        <form onSubmit={formik.handleSubmit} >
                            <FormControl id="userName" isInvalid={Boolean(formik.errors.username && formik.touched.username)}>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" name='username' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="email" isInvalid={Boolean(formik.errors.email && formik.touched.email)} >
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="password" isInvalid={Boolean(formik.errors.password && formik.touched.password)}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                    <InputRightElement h={'full'}>
                                        <Button rounded='10px' fontSize='10px' bg={'transparent'} color={'#39A7FF'}
                                            variant={'ghost'}
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? 'hide' : 'show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="confirmpassword" isInvalid={Boolean(formik.errors.confirmpassword && formik.touched.confirmpassword)}  >
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPasswordconfirm ? 'text' : 'password'} name='confirmpassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmpassword} />
                                    <InputRightElement h={'full'} >
                                        <Button rounded='10px' fontSize='10px' bg={'transparent'} color={'#39A7FF'}
                                            variant={'ghost'}
                                            onClick={() => setShowPasswordconfirm((showPasswordconfirm) => !showPasswordconfirm)}>
                                            {showPasswordconfirm ? 'hide' : 'show'}

                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{formik.errors.confirmpassword}</FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button tbgColor='grey.800' borderRadius={5} type='submit' variant='solid' size='md' fontSize='sm'
                                    bg={'#39A7FF'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'white',
                                        color: '#39A7FF',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link to='/login' color=''>Login</Link>
                                </Text>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Register