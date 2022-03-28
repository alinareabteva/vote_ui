import React from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AuthApi} from "../../../api/AuthApi"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import {
    Avatar,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import CustomDatePicker from "../../../primitives/CustomDatePicker/CustomDatePicker";
import {LoadingButton} from "@mui/lab";
import moment from "moment";

const paperStyle = {padding: 20, width: 300, margin: "0 auto"}
const headerStyle = {margin: 0}
const avatarStyle = {backgroundColor: '#1bbd7e'}
const marginTop = {marginTop: 7}

const MIN_BIRTH_DATE = moment().subtract(115, 'years');
const MAX_BIRTH_DATE = moment().endOf('day').subtract(18, 'years');

const useSignupFormState = (registrationSuccessCallback) => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            idnp: "",
            country: "",
            region: "",
            birthDate: null,
            gender: "",
            localityType: "",
            education: null,
            userName: "",
            email: "",
            password: "",
            hasAcceptedTermsAndConditions: false,
            loading: false
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            idnp: Yup.string()
                .required('Required')
                .matches(/(\d){13}/, 'Should have 13 digits'),
            country: Yup.string()
                .required('Required')
                .matches(/^[A-z\-']+$/g, 'Invalid country name format'),
            region: Yup.string()
                .required('Required')
                .matches(/^[A-z\-']+$/g, 'Invalid region name format'),
            email: Yup.string().email('Invalid email address')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
                .required('Required'),
            birthDate: Yup.date()
                .min(MIN_BIRTH_DATE, 'MIN_AGE')
                .max(MAX_BIRTH_DATE, 'MAX_AGE'),
            gender: Yup.string().required('Required'),
            localityType: Yup.string().required('Required'),
            education: Yup.string().required('Required'),
            userName: Yup.string()
                .min(7, 'Must be at least 7 characters')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character').required('Required'),
            hasAcceptedTermsAndConditions: Yup.bool().oneOf([true], 'Must Accept Terms and Conditions'),
            validateOnBlur: false,
        }),
        onSubmit: values => {
            const {loading, ...payload} = values;
            setLoading(true)
            AuthApi.register(payload)
                .then(user => {
                    setLoading(false)
                    registrationSuccessCallback && registrationSuccessCallback(user)
                })
                .catch(e => {
                    //TODO: set errors in the form
                    debugger
                    setLoading(false)
                })
        }
    });

    const setLoading = (loading) => formik.setFieldValue('loading', loading)

    const createDefaultPropsForTextField = (fieldName) => {
        return {
            onChange: formik.handleChange,
            value: formik.values[fieldName],
            error: formik.touched[fieldName] && Boolean(formik.errors[fieldName]),
            helperText: formik.touched[fieldName] && formik.errors[fieldName],
            onBlur: formik.handleBlur
        }
    }



    const onSubmit = (e) => {
        e.preventDefault();
        formik.submitForm();
    }

    return {
        formik,
        onSubmit,
        createDefaultPropsForTextField
    }
}


const SignupForm = ({registrationSuccessCallback}) => {
    const {formik, onSubmit, createDefaultPropsForTextField} = useSignupFormState(registrationSuccessCallback);
//TODO: add formik for field validation and error showing for complex elements

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon/>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        label='First Name'
                        placeholder="Enter your first name"
                        name="firstName"
                        {...createDefaultPropsForTextField('firstName')}
                    />
                    <TextField
                        fullWidth
                        label='Last Name'
                        placeholder="Enter your name"
                        name="lastName"
                        {...createDefaultPropsForTextField('lastName')}
                    />
                    <TextField
                        fullWidth label='IDNP'
                        placeholder="Enter your IDNP"
                        name="idnp"
                        {...createDefaultPropsForTextField('idnp')}
                    />
                    <CustomDatePicker
                        label="Date of Birth"
                        onChange={value => formik.setFieldValue('birthDate', value)}
                        value={formik.values.birthDate}
                        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                        minDate={MIN_BIRTH_DATE}
                        maxDate={MAX_BIRTH_DATE}
                        textFieldProps={{
                            helperText: formik.touched.birthDate && formik.errors.birthDate,
                            error: formik.touched.birthDate && Boolean(formik.errors.birthDate)
                        }}
                    />
                    <TextField
                        fullWidth
                        label='Country'
                        placeholder="Enter your country"
                        name="country"
                        {...createDefaultPropsForTextField("country")}
                    />
                    <TextField
                        fullWidth
                        label='Region'
                        placeholder="Enter your region"
                        name="region"
                        {...createDefaultPropsForTextField('region')}
                    />

                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Locality</FormLabel>
                        <RadioGroup aria-label="localityType" name="localityType" style={{display: 'initial'}}
                                    {...createDefaultPropsForTextField('localityType')} >
                            <FormControlLabel value="city" control={<Radio value="CITY"/>} label="City"/>
                            <FormControlLabel value="village" control={<Radio value="VILLAGE"/>} label="Village"/>
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender"
                                    style={{display: 'initial'}} {...createDefaultPropsForTextField('gender')}>
                            <FormControlLabel value="female" control={<Radio value="F"/>} label="Female"/>
                            <FormControlLabel value="male" control={<Radio value="M"/>} label="Male"/>
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Education
                        </InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'education',
                                id: 'uncontrolled-native',
                            }}
                            {...createDefaultPropsForTextField('education')}
                        >
                            <option value=""> -- Select an option --</option>
                            <option value="SECONDARY">Secondary Education</option>
                            <option value="TECHNICAL">Technical Education</option>
                            <option value="HIGHER">Higher Education</option>
                        </NativeSelect>
                    </FormControl>

                    <TextField
                        fullWidth label='Email'
                        placeholder="Enter your email"
                        name="email"
                        {...createDefaultPropsForTextField('email')}
                    />
                    <TextField
                        fullWidth
                        label='Login'
                        placeholder="Enter your login"
                        name="userName"
                        {...createDefaultPropsForTextField('userName')}
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        placeholder="Enter your password"
                        name="password"
                        {...createDefaultPropsForTextField('password')}
                    />
                    <FormControlLabel
                        control={<Checkbox name="hasAcceptedTermsAndConditions"
                                           {...createDefaultPropsForTextField('hasAcceptedTermsAndConditions')}/>}
                        label="I accept the terms and conditions."
                    />
                    <LoadingButton loading={formik.values.loading}
                                   disabled={!formik.dirty || Object.keys(formik.errors)?.length > 0} type='submit'
                                   variant='contained' color='primary'>Sign up</LoadingButton>
                </form>
            </Paper>
        </Grid>
    )
}

export default SignupForm;
