import React from 'react';
import CandidateForm from "../CandidateForm/CandidateForm";
import {CandidatesApi} from "../../../api/CandidatesApi";
import {setAddedCandidate} from "../../../redux/actions/candidate-actions";
import {ROUTES_PATHS} from "../../../layout/routes-constants";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";


const AddCandidate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (payload) => {
        CandidatesApi
            .addCandidate(payload)
            .then(addedCandidate => dispatch(setAddedCandidate(addedCandidate)))
            .then(() => navigate(ROUTES_PATHS.CANDIDATES))
            .catch(console.error)
    }
    return (
        <CandidateForm submitHandler={submitHandler}/>
    )
}

export default AddCandidate;