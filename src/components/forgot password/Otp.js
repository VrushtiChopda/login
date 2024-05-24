
import { Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import React from 'react'
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { number, object } from 'yup';

function Otp() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()

    const email = localStorage.getItem('email') || '';

    if (!email) {
        console.error('No email found in local storage');

    }
    const otpSchema = object({
        otp: number().required('otp is required')
    })
    const handleOtp = async (values) => {
        console.log(otp, "-----values otp")
        const res = await axios.post('http://localhost:5000/api/userForgotPasswordOtp', {
            otp: values.otp,
            email: values.email
        })
        console.log(res.data, '--------------')
        navigate('/update')
    }

    return (
        <>
            <div className='d-flex justify-content-center'>
                <Paper elevation={7} className='main-container'>
                    <Formik
                        initialValues={{ otp: '', email: email }}
                        validationSchema={otpSchema}
                        onSubmit={handleOtp}
                    >
                        {({ handleSubmit, setFieldValue, values }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <h3 className='text-center'>Enter OTP</h3>
                                    </Grid>
                                    <Grid item xs={12} className='ms-4'>
                                        <OtpInput
                                            value={values.otp}
                                            onChange={(otp) => setFieldValue('otp', otp)}
                                            numInputs={4}
                                            name="otp"
                                            renderSeparator={<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                                            renderInput={(props) => <input {...props} />}
                                            inputStyle={{
                                                width: 50,
                                                height: 50,
                                                backgroundColor: '#EDEDEC',
                                                border: 'none',
                                                borderRadius: 10,
                                            }}
                                            focusStyle={{
                                                borderRadius: 20,
                                                outline: 'none',
                                            }}

                                        ></OtpInput>
                                        <ErrorMessage name="otp" />
                                    </Grid>
                                    <Grid item xs={12} className='ms-5'>
                                        <Button
                                            type='submit'
                                            size='large'
                                            variant="outlined"
                                        // disabled={isSubmitting}
                                        >Change PassWord</Button>
                                    </Grid>
                                </Grid>
                            </Form>

                        )}

                    </Formik>

                </Paper>
            </div>


        </>
    )
}

export default Otp
