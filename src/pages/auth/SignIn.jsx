import { Avatar, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authServices from '../../services/auth.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: async (values) => {
            try {
            await authServices.login(values).then(
                (response) => {
                    toast.success("Login Successfully!")
                    navigate("/")
                    window.location.reload()
                }, 
                (error) => {
                    if(error.response.status === 401){
                        toast.error("Login Failed. Please check your email and password")
                    }else{
                    console.log("Login Error ", error)
                    }
                }
            )
        } catch (error) {
            console.log("Login catch error ", error)
        }
        }
    })
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authServices.login(email, password).then(
                (response) => {
                    toast.success("Login Successfully!")
                    navigate("/")
                    window.location.reload()
                }, 
                (error) => {
                    if(error.response.status === 401){
                        toast.error("Login Failed. Please check your email and password")
                    }else{
                    console.log("Login Error ", error)
                    }
                }
            )
        } catch (error) {
            console.log("Login catch error ", error)
        }
    }

    const paperStyle = { padding: 20, height:'55vh', width: 420, margin: '80px auto' }
    const avatarStyle = {background: '#121828'}
    const errorStyle = { color: "red", fontWeight: "300", fontSize: 15, margin: '0px auto 15px auto'}
  return (
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
                <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                <h2>Log In</h2>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
            <TextField sx={{ mb: 1 }} variant="outlined" name="email" value={formik.values.email} onChange={formik.handleChange} label="Email" placeholder='Enter Email' fullWidth />
            {formik.touched.email && formik.errors.email ? (<p style={errorStyle}>{formik.errors.email}</p>): null}
            <TextField sx={{ mb: 1 }} variant="outlined" name='password' value={formik.values.password} onChange={formik.handleChange} label="Password" placeholder='Enter Password' type="password" fullWidth />
            {formik.touched.password && formik.errors.password ? (<p style={errorStyle}>{formik.errors.password}</p>): null}
            <Button sx={{ mb: 2 }} type="submit" variant="contained" color='primary' fullWidth>Log In</Button>
            </form>
            <Divider />
            <Typography variant='h6' align='center' sx={{ mt:2, color:'#888686', fontWeight:500}}>
                Don't have an account?
            </Typography>
            <ToastContainer />
        </Paper>
    </Grid>
  )
}

export default SignIn