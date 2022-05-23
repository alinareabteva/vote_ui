import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {AuthApi} from "../api/AuthApi";
import {Spinner} from "reactstrap";
import {Button} from "@mui/material";
import {ROUTES_PATHS} from "../layout/routes-constants";

const bodyStyle = {
    background: '#fff4a3',
    marginTop: '10%',
}
const text1Style = {
    fontFamily: 'Raleway, Arial',
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold'

}
const text2Style = {
    fontFamily: 'Raleway, Arial',
    fontSize: 26,
    textAlign: 'center'

}
const buttonStyle = {
    left: '46%'
}

const SubmitEmailVerificationContainer = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        registrationRequest: null,
        errors: null
    })

    useEffect(() => {
        if (params?.id) {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            AuthApi.checkEmail(params.id)
                .then(registrationRequest => {
                    setState(prevState => ({
                        ...prevState,
                        loading: false,
                        registrationRequest,
                    }))
                }).catch(errors => setState(prevState => ({
                ...prevState,
                loading: false,
                errors
            })))
        }
    },[params?.id])

    const onClickGoToSignIn = () => {
        navigate(ROUTES_PATHS.LOGIN_PAGE);
    }

    return (
        <div style={bodyStyle}>
            {state.loading && <Spinner/>}
            {!state.loading && !!state.registrationRequest && (

                <div class="success-submitting">
                    <h1 style={text1Style}>Congratulations!</h1>
                    <p style={text2Style}>Your email has been confirmed and registration is finished.</p>
                    <p style={text2Style}> Now you're able to Sign in </p>
                    <Button variant="contained" color="success" style={buttonStyle} onClick={onClickGoToSignIn}>Go to Sign In</Button>
                </div>
            )}
            {state.errors && state.errors}
        </div>
    );
};

export default SubmitEmailVerificationContainer;