import { Grid, Paper, TextField, Button } from '@mui/material'
import axios from 'axios'
import { Field, Formik, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
// import yup as yu
function Email() {
    const emailSchema = object({
        email: string().email('Enter valid Email').required()
    })

    const navigate = useNavigate()
    const email = localStorage.getItem('email') || '';
    const handleEmail = async (values) => {
        try {
            const res = await axios.post('http://localhost:5000/api/userForgotPasswordEmail', { email: values.email })
            console.log(res, '-------------------')

        } catch (error) {
            console.log("invalid email", error)
        }
        navigate('/otp')


    }


    return (
        <>
            <div className='d-flex justify-content-center'>
                <Paper elevation={7} className='main-container'>
                    <h3 className='text-center'>Forgot Password</h3>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={emailSchema}
                        onSubmit={handleEmail}
                    >
                        {({ errors, touched, isSubmitting, handleSubmit }) => (
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

                                    <Grid item xs={12} className='d-flex justify-content-center'>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            size="large"
                                            disabled={isSubmitting}
                                        >
                                            Get OTP
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>

                        )}


                    </Formik>

                </Paper>
            </div >
        </>
    )
}

export default Email
