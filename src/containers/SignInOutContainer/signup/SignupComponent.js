import React, {useState} from 'react';
import SignupForm from "./SignupForm";

const submitStyle = {
    color: '#7c795d',
    fontFamily: 'Raleway, Arial',
    position: 'absolute',
    fontSize: 26,
    '@media (min-width:150px)': {
        fontSize: 16,
    },
    lineHeight: 8,
    left: '35%',
    margin: 0
}
const emailStyle = {
    position: 'absolute',
    color: '#7c795d',
    fontFamily: 'Trocchi',
    fontSize: 26,
    lineHeight: 12,
    left: '25%'
}

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
                <span style={submitStyle}>
                    To submit your registration, please verify email:
                    <b style={emailStyle}>{registrationState?.registrationRequest?.user?.email}</b>
                </span>

            ) : (
                <SignupForm registrationSuccessCallback={registrationSuccessCallback}/>
            )}
        </div>
    );
};

export default SignupComponent;