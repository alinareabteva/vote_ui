import React, {useState} from 'react'
import {AuthApi} from "../../../api/AuthApi"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import {
    Avatar, Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper, Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import CustomDatePicker from "../../../primitives/CustomDatePicker/CustomDatePicker";
import {LoadingButton} from "@mui/lab";

const paperStyle = {padding: 20, width: 300, margin: "0 auto"}
const headerStyle = {margin: 0}
const avatarStyle = {backgroundColor: '#1bbd7e'}
const marginTop = {marginTop: 7}

const SignupForm = ({registrationSuccessCallback}) => {

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        idnp: "",
        country: "",
        region: "",
        birthDate: null,
        gender: "",
        localityType: "",
        userName: "",
        email: "",
        password: "",
        education: null,
        hasAcceptedTermsAndConditions: false,
        loading: false
    })

    const onChange = ({target: {name, value}}) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onChangeDate = (birthDate) => {
        setState(prevState => ({
            ...prevState,
            birthDate
        }))
    }

    const setLoading = (loading) => setState(prevState => ({
        ...prevState,
        loading
    }))

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const {loading, ...payload} = state;
        AuthApi.register(payload)
            .then(user => {
                setLoading(false)
                registrationSuccessCallback && registrationSuccessCallback(user)
            })
            .catch(e => {
                setLoading(false)
            })
    }
//TODO: add formik for field validation and state management

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
                <form>
                    <TextField fullWidth label='First Name' placeholder="Enter your first name" onChange={onChange}
                               name="firstName" value={state.firstName}/>
                    <TextField fullWidth label='Last Name' placeholder="Enter your name" onChange={onChange}
                               name="lastName" value={state.lastName}/>
                    <TextField fullWidth label='IDNP' placeholder="Enter your IDNP" onChange={onChange} name="idnp"
                               value={state.idnp}/>

                    {/* TODO: set max date as per voter: 18+*/}
                    <CustomDatePicker label="Date of Birth" onChange={onChangeDate} value={state.birthDate}/>
                    <TextField fullWidth label='Country' placeholder="Enter your country" onChange={onChange}
                               name="country" value={state.country}/>
                    <TextField fullWidth label='Region' placeholder="Enter your region" onChange={onChange}
                               name="region" value={state.region}/>

                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Locality</FormLabel>
                        <RadioGroup aria-label="localityType" name="localityType" style={{display: 'initial'}}
                                    value={state.localityType} onChange={onChange}>
                            <FormControlLabel value="city" control={<Radio value="CITY"/>} label="City"/>
                            <FormControlLabel value="village" control={<Radio value="VILLAGE"/>} label="Village"/>
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{display: 'initial'}} onChange={onChange}>
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
                            value={state.education}
                            onChange={onChange}
                        >
                            <option value={null}> -- Select an option --</option>
                            <option value="SECONDARY">Secondary Education</option>
                            <option value="TECHNICAL">Technical Education</option>
                            <option value="HIGHER">Higher Education</option>
                        </NativeSelect>
                    </FormControl>

                    <TextField fullWidth label='Email' placeholder="Enter your email" onChange={onChange} name="email"
                               value={state.email}/>
                    <TextField fullWidth label='Login' placeholder="Enter your login" onChange={onChange}
                               name="userName" value={state.userName}/>
                    <TextField fullWidth label='Password' placeholder="Enter your password" onChange={onChange}
                               name="password" value={state.password}/>
                    <FormControlLabel
                        control={<Checkbox name="hasAcceptedTermsAndConditions"
                                           value={state.hasAcceptedTermsAndConditions} onChange={onChange}/>}
                        label="I accept the terms and conditions."
                    />
                    <LoadingButton loading={state.loading} type='submit' variant='contained' color='primary'
                                   onClick={onSubmit}>Sign up</LoadingButton>
                </form>
            </Paper>
        </Grid>
    )
}

export default SignupForm;
