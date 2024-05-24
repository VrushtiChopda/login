import React from 'react';
import './login.css'
import { Button, Grid, Paper, TextField } from '@mui/material';
import { ErrorMessage, Field, Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import { loginApi } from '../../servicer/service';

export default function Login() {
    const loginSchema = object({
        email: string().email().required("Email is required"),
        password: string().min(6, "Password should be of minimum 6 characters length").max(10, "Password should be of maximum 10 characters length").required("Password is required")
    });



    const handleLogin = async (userData) => {
        try {
            // const res = await axios.post('http://localhost:5000/api/login', userData);
            const res = await loginApi(userData);
            console.log(res.data, "login data-------------------- ");
            localStorage.setItem('token', res.data.token)
            console.log(res.data.token, '----------token--------------')
            notify()
        } catch (error) {
            console.error("Error during login:", error);
        }

    };
    const notify = () =>
        toast("Login Successfully");
    return (
        <>
            <div className='d-flex justify-content-center '>
                <Paper elevation={6} className='main-container'>
                    <h1 className='text-center'>Sign In</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleSubmit, isSubmitting, touched, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={<ErrorMessage name="email" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={<ErrorMessage name="password" />}
                                        />
                                    </Grid>
                                    <Grid xs={12} className='d-flex justify-content-end'>
                                        <Link to='/email' className='forgotPass'>Forgot Password?</Link>
                                    </Grid>
                                    <Grid item xs={12} className='text-center' >
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            size="large"
                                            disabled={isSubmitting}
                                        >
                                            Log In
                                        </Button>
                                    </Grid>

                                    <Grid className='ms-4 mt-2 '>
                                        <p>Not Registered yet ? <Link to='/' className='loginLink'>Register now</Link></p>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Paper>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </>

    );
}


