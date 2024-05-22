import { Button, Grid, Paper, TextField } from '@mui/material';
import { Field, Formik, ErrorMessage } from 'formik';
import React from 'react';
import axios from 'axios';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const userSchema = object({
        fname: string().required('First Name is required'),
        lname: string().required('Last Name is required'),
        email: string().required('Email is required').email('Invalid email address'),
        password: string().min(6, 'Password must be at least 6 characters').max(10, 'Password must be at most 10 characters')
    });
    const navigate = useNavigate()
    const handleSubmit = async (userData, { setSubmitting }) => {
        console.log(userData)
        try {
            const response = await axios.post('http://localhost:5000/api/adduser', userData);
            console.log(response.data, "-------------------------");
            alert('User registered successfully');
        } catch (error) {
            console.error(error);
            alert('Error registering user');
        } finally {
            setSubmitting(false);
        }
        navigate('/login')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <center>
                <Paper elevation={5} style={{ width: '400px', marginTop: '4rem', padding: '1rem' }}>
                    <h1>Sign Up</h1>

                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={userSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={11}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="fname"
                                            label="First Name"
                                            name="fname"
                                            value={formik.values.fname}
                                            onChange={formik.handleChange}
                                            autoComplete="fname"
                                            autoFocus
                                            error={formik.touched.fname && Boolean(formik.errors.fname)}
                                            helperText={<ErrorMessage name="fname" />}
                                        />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="lname"
                                            label="Last Name"
                                            name="lname"
                                            value={formik.values.lname}
                                            onChange={formik.handleChange}
                                            autoComplete="lname"
                                            error={formik.touched.lname && Boolean(formik.errors.lname)}
                                            helperText={<ErrorMessage name="lname" />}
                                        />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            autoComplete="email"
                                            error={formik.touched.email && Boolean(formik.errors.email)}
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
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            autoComplete="password"
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={<ErrorMessage name="password" />}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    style={{ marginTop: '1rem' }}
                                    disabled={formik.isSubmitting}
                                >
                                    Register
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </center>
        </div>
    );
}








