import React, {useState} from 'react'

import Login from './Login'
import {Box, Paper, Tab, Tabs, Typography} from "@mui/material";
import SignupComponent from "./signup/SignupComponent";


const SignInOutContainer = () => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const paperStyle = {width: 350, margin: "20px auto"}

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                       {children}
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Paper elevation={20} style={paperStyle}>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Sign In"/>

                <Tab label="Sign Up"/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <Login handleChange={handleChange}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignupComponent/>
            </TabPanel>
        </Paper>


    )
}

export default SignInOutContainer;
