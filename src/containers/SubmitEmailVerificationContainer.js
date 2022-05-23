import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {AuthApi} from "../api/AuthApi";
import {Spinner} from "reactstrap";
import {Button} from "@mui/material";
import {ROUTES_PATHS} from "../layout/routes-constants";

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
    // TODO: fix visual
    return (
        <div>
            {state.loading && <Spinner/>}
            {!state.loading && !!state.registrationRequest && (
                <div className="success-submitting">
                    <h1>Congratulations</h1>
                    <p>Your email has been confirmed and registration is finished.</p>
                    <p> Now you're able to Sign in </p>
                    <Button onClick={onClickGoToSignIn}>Go to Sign In</Button>
                </div>
            )}
            {state.errors && state.errors}
        </div>
    );
};

export default SubmitEmailVerificationContainer;