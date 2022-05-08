import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import {AuthApi} from "../../api/AuthApi";
import tokenUtility from "../../api/tokenUtility";
import {LoadingButton} from "@mui/lab";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../../redux/actions/auth-actions";
import {useFormik} from "formik";
import * as Yup from 'yup';

const paperStyle = {padding: 20, height: '65vh', width: 300, margin: "0 auto"}
const avatarStyle = {backgroundColor: '#1bbd7e'}
const btnstyle = {margin: '8px 0'}

const useLoginPageState = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            login: "",
            password: "",
            code: "",
            shouldShowConfirmationCode: false,
            loading: false,
        },
        validationSchema: Yup.object({
            login: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            code: Yup.string()
                .when(['shouldShowConfirmationCode'], (shouldShowConfirmationCode) => {
                    if (shouldShowConfirmationCode) {
                        return Yup.string().required();
                    }
                })
        }),
        onSubmit: values => {
            const {login, password, shouldShowConfirmationCode, code} = values;
            setLoading(true);
            AuthApi.login({
                login,
                password,
                ...(shouldShowConfirmationCode && code && {code})
            }).then(data => {
                if (!formik.values.shouldShowConfirmationCode) {
                    formik.setFieldValue('shouldShowConfirmationCode', true)
                } else {
                    tokenUtility.setTokens(data)
                    AuthApi.getMe().then(data => {
                        dispatch(setCurrentUser(data))
                    })
                }
            })
                .catch(e => {
                    console.error(e)
                    const errMessage = e?.response?.data?.message;
                    if (errMessage?.includes('code')) {
                        formik.setErrors({...formik.errors, code: errMessage})
                    }
                    if (['email', 'login', 'password', 'credentials'].some(key => errMessage?.includes(key))) {
                        formik.setErrors({...formik.errors, login: errMessage})
                    }
                    //TODO: display errors on form
                })

                .finally(e => {
                    setLoading(false)
                })
        }
    })

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

    return {
        formik,
        createDefaultPropsForTextField
    }
}


const Login = ({handleChange}) => {
    const {formik, createDefaultPropsForTextField} = useLoginPageState();
    const onClickSignIn = (e) => {
        e.preventDefault()
        formik.submitForm();
    }

    return (
        <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
            <form>
                <Paper style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h3>Sign In</h3>
                    </Grid>
                    <TextField label='Login' placeholder='Enter login' fullWidth required
                               name="login" {...createDefaultPropsForTextField('login')}/>
                    <TextField label='Password' placeholder='Enter password' type='password' name="password" fullWidth
                               required {...createDefaultPropsForTextField('password')}/>
                    {formik.values.shouldShowConfirmationCode && (
                        <>
                            <Typography>To your email was sent security code, please, enter it below</Typography>
                            <TextField label='Confirmation Code' placeholder='Enter security code' name="code" fullWidth
                                       required {...createDefaultPropsForTextField('code')}/>
                        </>
                    )}
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <LoadingButton type='submit' color='primary' variant="contained" style={btnstyle}
                                   loading={formik.values.loading} fullWidth
                                   disabled={!formik.dirty && Object.keys(formik.errors)?.length > 0}
                                   onClick={onClickSignIn}>
                        Sign in
                    </LoadingButton>
                    <Typography>
                        <Link href="#">
                            Forgot password ?
                        </Link>
                    </Typography>
                    <Typography> To create an account click here &nbsp;
                        <Link href="#" onClick={() => handleChange("event", 1)}>
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </form>
        </div>
    )
}

export default Login
