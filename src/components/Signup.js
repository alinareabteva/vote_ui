import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';

import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 7 }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Surname' placeholder="Enter your surname" />
                    <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='IDNP' placeholder="Enter your IDNP" />
                    <TextField fullWidth label='Date of Birth' placeholder="Enter your date of birth" />
                    <TextField fullWidth label='Country' placeholder="Enter your country" />
                    <TextField fullWidth label='Region' placeholder="Enter your region" />

                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Locality</FormLabel>
                        <RadioGroup aria-label="locality" name="locality" style={{ display: 'initial' }}>
                            <FormControlLabel value="city" control={<Radio />} label="City" />
                            <FormControlLabel value="village" control={<Radio />} label="Village" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Education
                      </InputLabel>
                      <NativeSelect
                        defaultValue={30}
                        inputProps={{
                          name: 'education',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={1}>Secondary Education</option>
                        <option value={2}>Technical Education</option>
                        <option value={3}>Higher Education</option>

                      </NativeSelect>
                    </FormControl>

                    <TextField fullWidth label='Email' placeholder="Enter your email" />
                    <TextField fullWidth label='Login' placeholder="Enter your login" />
                    <TextField fullWidth label='Password' placeholder="Enter your password"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;
