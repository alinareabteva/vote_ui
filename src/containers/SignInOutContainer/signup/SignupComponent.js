import React, {useState} from 'react';
import SignupForm from "./SignupForm";

const SignupComponent = () => {
    const [registrationState, setRegistrationState] = useState({
        submitted: false,
        registrationRequest: {}
    })

    const registrationSuccessCallback = (registrationRequest) => {
        setRegistrationState({
            submitted: true,
            registrationRequest
        })
    }


    return (
        <div className="signup">
            {registrationState.submitted ? (
                <span>
                    To submit your registration, please verify email: <b>{registrationState?.registrationRequest?.user?.email}</b>
                </span>
            ) : (
                <SignupForm registrationSuccessCallback={registrationSuccessCallback}/>
            )}
        </div>
    );
};

export default SignupComponent;