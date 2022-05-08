import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import {ROUTES_PATHS} from "../../../layout/routes-constants";
import ElectionForm from "../ElectionForm/ElectionForm";
import {ElectionsApi} from "../../../api/ElectionsApi";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentElection} from "../../../redux/actions/election-actions";

const EditElection = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentElection} = useSelector(state => state?.elections)


    const [state, setState] = useState({
        loading: false,
        initialFormValues: undefined,
        errors: null
    })

    useEffect(() => {
        if (params?.id) {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            ElectionsApi.getElection(params.id)
                .then(election => {
                    dispatch(setCurrentElection(election))
                }).catch(errors => setState(prevState => ({
                ...prevState,
                loading: false,
                errors
            })))
        }
    },[params?.id])

    useEffect(() => {
        if (!currentElection) {
            return;
        }
        const {title, startDate, candidates} = currentElection
        setState(prevState => ({
            ...prevState,
            loading: false,
            initialFormValues: {
                title,
                electionDate: startDate,
                candidateIds: candidates.map(c => c.id)
            }
        }))
    }, [currentElection?.id])

    const submitForm = (payload) => {
        ElectionsApi.updateElection({
            ...payload,
            id: currentElection.id
        })
            .then(data => {
                navigate(ROUTES_PATHS.ELECTIONS)
            })
    }

    return (
        <>
            {state.initialFormValues && <ElectionForm submitHandler={submitForm} formTitle="Edit Election" submitButtonTitle="Edit Election" initialValues={state.initialFormValues}/>}
        </>
    );
};

export default EditElection;