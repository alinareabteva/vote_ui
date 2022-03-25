import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";

const Login=({handleChange})=>{

    const paperStyle={padding :20,height:'45vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Login' placeholder='Enter login' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <TextField label='Confirmation Code' placeholder='Enter confirmation code' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
                <Link href="Home.js" onClick={()=>handleChange("event",1)} > Sign in
                </Link>
                </Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > To create an account click here &nbsp;
                     <Link href="#" onClick={()=>handleChange("event",1)} >
                        Sign Up
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
