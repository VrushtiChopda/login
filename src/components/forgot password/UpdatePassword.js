import { Button, Grid, Paper, TextField } from '@mui/material'
import axios from 'axios'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { object, ref, string } from 'yup'

function UpdatePassword() {
    const handlePassword = object({
        newpass: string().required('it is required'),
        confirmpass: string().oneOf([ref('newpass'), null], 'please enter correct password')
    })
    const email = localStorage.getItem('email' || '')
    if (!email) {
        console.error('No email found in local storage');
    }
    const handleUpdatePassword = async (values) => {
        try {
            const res = await axios.post('http://localhost:5000/api/updatePassword', {
                email: values.email,
                newpassword: values.newpass,
                conformPassword: values.confirmpass,
            })
            notify()
            console.log(res.data, '----------update password------------')
        } catch (error) {
            console.log(error, 'update error')
        }
    }
    const notify = () =>
        toast("Password updated");
    return (
        <>
            <div className='d-flex justify-content-center ' >
                <Paper className='main-container' elevation={7}>
                    <h3>Enter new password</h3>
                    <Formik
                        initialValues={
                            {
                                email: email,
                                newpass: '',
                                confirmpass: ''
                            }}
                        validationSchema={handlePassword}
                        onSubmit={handleUpdatePassword}
                    >
                        {({ handleSubmit, isSubmitting, touched, errors, }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="newpass"
                                            label="Email new password"
                                            name="newpass"
                                            error={touched.newpass && Boolean(errors.newpass)}
                                            helperText={<ErrorMessage name="newpass" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="confirmpass"
                                            label="Email new password"
                                            name="confirmpass"
                                            error={touched.confirmpass && Boolean(errors.confirmpass)}
                                            helperText={<ErrorMessage name="confirmpass" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className='text-center' >
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            size="large"
                                        // disabled={isSubmitting}
                                        >
                                            Change Password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
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
    )
}

export default UpdatePassword
