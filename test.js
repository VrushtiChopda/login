import { Button, Grid, Paper, TextField } from '@mui/material'
import { Field, Formik, ErrorMessage } from 'formik'
import React from 'react'
import axios from 'axios'
import { object, string } from 'yup'

export default function Registration() {
    const userSchema = object({
        fname: string().required(),
        lname: string().required(),
        email: string().required().email(),
        password: string().min(6).max(10)
    })
    // async function registerUser() {
    //     const response = await axios.post('localhost:5000/api/adduser')
    //     console.log(response.data)
    // }
    const handleSubmit = async (userData) => {
        await axios.post('http://localhost:5000/api/adduser', userData)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    return (
        <>
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
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2))
                                    setSubmitting(false)
                                }, 400)
                                handleSubmit()

                            }}
                        >
                            {({ values, handleChange, handleSubmit, errors, touched }) => (
                                <>
                                    <form >
                                        <Grid container spacing={3} >
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="fname"
                                                    label="First Name"
                                                    name="fname"
                                                    value={values.fname}
                                                    onChange={handleChange}
                                                    autoComplete="fname"
                                                    autoFocus
                                                    error={touched.fname && Boolean(errors.fname)}
                                                    helperText={<ErrorMessage name="fname" />}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="lname"
                                                    label="Last Name"
                                                    name="lname"
                                                    value={values.lname}
                                                    onChange={handleChange}
                                                    autoComplete="lname"
                                                    error={touched.lname && Boolean(errors.lname)}
                                                    helperText={<ErrorMessage name="lname" />}
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
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
                                                    label="Enter password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    autoComplete="password"
                                                    error={touched.password && Boolean(errors.password)}
                                                    helperText={<ErrorMessage name="password" />}
                                                />

                                            </Grid>
                                        </Grid>
                                    </form>
                                    <Button variant='outlined' >Register</Button>
                                </>
                            )}
                        </Formik>
                        <br />
                    </Paper>
                </center>
            </div>
        </>
    )
}




// import { Button, Grid, Paper, TextField } from '@mui/material'
// import { Formik } from 'formik'
// import React from 'react'

// export default function Registration() {

//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     fname: '',
//                     lname: '',
//                     email: '',
//                     password: ''
//                 }}
//                 validate={values => {
//                     const errors = {};
//                     if (!values.fname) {
//                         errors.fname = "required"
//                     }

//                     if (!values.lname) {
//                         errors.lname = "required"
//                     }
//                     if (!values.email) {
//                         errors.email = "required"
//                     } else if (
//                         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                     ) {
//                         errors.email = 'Invalid email address';
//                     }
//                     return errors;
//                 }}
//                 onSubmit={(values, { setSubmitting }) => {
//                     setTimeout(() => {
//                         alert(JSON.stringify(values, null, 2))
//                         setSubmitting(false)
//                     }, 400)
//                 }}
//             >
//                 {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
//                     <form onSubmit={handleSubmit}>
//                         {errors.fname && touched.fname && errors.fname}
//                         <input type='text' name='fname' placeholder='Enter fname' value={values.fname} onChange={handleChange}></input><br />
//                         {errors.lname && touched.lname && errors.lname}
//                         <input type='text' name='lname' placeholder='Enter lname' value={values.lname} onChange={handleChange}></input><br />
//                         {errors.email && touched.email && errors.email}
//                         <input type='text' name='email' placeholder='Enter email' value={values.email} onChange={handleChange}></input><br />
//                         <input type='text' name='password' placeholder='Enter password' value={values.password} onChange={handleChange}></input>
//                         <button type='submit' disabled={isSubmitting}> Login</button>
//                     </form>
//                 )}
//             </Formik >
//             {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <center>
//                     <Paper elevation={5} style={{ width: '400px', marginTop: '4rem', padding: '1rem' }}>
//                         <h1>Sign Up</h1>

//                         <Formik initialValues={initialValues}>


//                             <Grid container spacing={3} style={{ marginLeft: "4.3rem" }}>
//                                 <Grid item>
//                                     <TextField id="fname" label="Enter First Name" variant="outlined" />
//                                 </Grid>
//                                 <Grid item>
//                                     <TextField id="lname" label="Enter Last Name" variant="outlined" />
//                                 </Grid>
//                                 <Grid item>
//                                     <TextField id="email" label="Enter Email" variant="outlined" />
//                                 </Grid>
//                                 <Grid item>
//                                     <TextField id="password" label="Enter Password" variant="outlined" />
//                                 </Grid>
//                             </Grid>
//                         </Formik>
//                         <br />
//                         <Button variant='outlined'>Register</Button>
//                     </Paper>
//                 </center>
//             </div> */}
//         </>
//     )
// }
