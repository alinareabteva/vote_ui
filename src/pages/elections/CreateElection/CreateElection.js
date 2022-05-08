import React from 'react';
import {ROUTES_PATHS} from "../../../layout/routes-constants";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import ElectionForm from "../ElectionForm/ElectionForm";
import {ElectionsApi} from "../../../api/ElectionsApi";
import {setCreatedElection} from "../../../redux/actions/election-actions";


const CreateElection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (payload) => {
        debugger
        ElectionsApi
            .createElection(payload)
            .then(createdElection => dispatch(setCreatedElection(createdElection)))
            .then(() => navigate(ROUTES_PATHS.ELECTIONS))
            .catch(console.error)
    }
    return (
        <ElectionForm submitHandler={submitHandler}/>
    )
}

export default CreateElection;