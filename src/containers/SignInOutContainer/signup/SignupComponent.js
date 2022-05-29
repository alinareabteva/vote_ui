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
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    marginTop: '5rem'
}
const emailStyle = {
    color: '#7c795d',
    fontFamily: 'Trocchi',
    fontSize: 26,
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
        <>
            {registrationState.submitted ? (
                <div style={submitStyle}>
                    To submit your registration, please verify email:
                    <br/>
                    <b style={emailStyle}>{registrationState?.registrationRequest?.user?.email}</b>
                </div>

            ) : (
                <div className="signup">
                    <SignupForm registrationSuccessCallback={registrationSuccessCallback}/>
                </div>
            )}
        </>

    );
};

export default SignupComponent;