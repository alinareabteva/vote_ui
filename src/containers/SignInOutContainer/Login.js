import React, {useState} from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import {AuthApi} from "../../api/AuthApi";
import tokenUtility from "../../api/tokenUtility";
import {LoadingButton} from "@mui/lab";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../../redux/actions/auth-actions";
import {useNavigate} from "react-router";
import {ROUTES_PATHS} from "../../layout/routes-constants";

const paperStyle = {padding: 20, height: '45vh', width: 300, margin: "0 auto"}
const avatarStyle = {backgroundColor: '#1bbd7e'}
const btnstyle = {margin: '8px 0'}

const Login = ({handleChange}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        login: "",
        password: "",
        code: "",
        shouldShowConfirmationCode: false,
        loading: false,
        signInDisabled: false
    })

    const onChange = ({target: {name, value}}) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onClickSignIn = (e) => {
        e.preventDefault()
        const {login, password, shouldShowConfirmationCode, code} = state;
        setState(prevState => ({
            ...prevState,
            loading: true
        }))
        AuthApi.login({
            login,
            password,
            ...(shouldShowConfirmationCode && code && {code})
        }).then(data => {
            setState(prevState => {
                if (!prevState.shouldShowConfirmationCode) {
                    return {
                        ...prevState,
                        shouldShowConfirmationCode: true
                    }
                } else  {
                    tokenUtility.setTokens(data)
                    AuthApi.getMe().then(data => {
                        dispatch(setCurrentUser(data))
                        navigate(ROUTES_PATHS.HOME_PAGE)
                    })
                }
            })
        }).finally(e => {
            setState(prevState => ({
                ...prevState,
                loading: false
            }))
        })
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Login' placeholder='Enter login' fullWidth required name="login" onChange={onChange}/>
                <TextField label='Password' placeholder='Enter password' type='password'  name="password" fullWidth required onChange={onChange}/>
                {state.shouldShowConfirmationCode && (
                    <>
                        <Typography>To your email was sent security code, please, enter it below</Typography>
                        <TextField label='Confirmation Code' placeholder='Enter security code' name="code" fullWidth required onChange={onChange}/>
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
                <LoadingButton type='submit' color='primary' variant="contained" style={btnstyle} loading={state.loading} fullWidth disabled={state.signInDisabled} onClick={onClickSignIn}>
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
        </Grid>
    )
}

export default Login
