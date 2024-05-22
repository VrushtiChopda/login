import React from 'react';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { ErrorMessage, Field, Formik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

export default function Login() {
    const loginSchema = object({
        email: string().email().required("Email is required"),
        password: string().min(6, "Password should be of minimum 6 characters length").max(10, "Password should be of maximum 10 characters length").required("Password is required")
    });

    const handleLogin = async (userData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/login', userData);
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
            {/* <button onClick={notify}>Notify</button> */}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={4} style={{ width: '330px', marginTop: '7rem', padding: '1rem' }}>
                    <h1 style={{ textAlign: 'center' }}>Sign In</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleSubmit, isSubmitting, touched, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={11}>
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
                                    <Grid item xs={11}>
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
                                    <Grid item xs={11}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            fullWidth
                                            size="large"
                                            disabled={isSubmitting}
                                        >
                                            Log In
                                        </Button>
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


