import React, {useEffect} from 'react';
import {TextField} from "@mui/material";
import {useElectionFormState} from "./useElectionFormState";
import {CandidateFormWrapper} from "./ElectionFormStyles";
import CustomDatePicker from "../../../primitives/CustomDatePicker/CustomDatePicker";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {CandidatesApi} from "../../../api/CandidatesApi";
import {setCandidates} from "../../../redux/actions/candidate-actions";
import CandidateSelect from "./CandidateSelect";
import {LoadingButton} from "@mui/lab";

const ElectionForm = ({
                          initialValues,
                          submitButtonTitle = 'Create Election',
                          formTitle = 'Create Election',
                          submitHandler
                      }) => {
    const dispatch = useDispatch();
    const {formik, createDefaultPropsForTextField, toggleCandidate} = useElectionFormState({initialValues, submitHandler});

    const {candidates, candidatesFetched} = useSelector(state => state?.candidates)

    useEffect(() => {
        if (!candidatesFetched) {
            CandidatesApi.getCandidates()
                .then(candidates => dispatch(setCandidates(candidates)))
        }
    }, [candidatesFetched])

    const onSelectCandidate = ({target: {value}}) =>{
        toggleCandidate(value)
    }


    return (
        <CandidateFormWrapper>
            <form onSubmit={formik.handleSubmit}>
                <h1> {formTitle} </h1>
                <TextField
                    fullWidth
                    label='Title'
                    placeholder="Enter election's title"
                    name="title"
                    {...createDefaultPropsForTextField('title')}
                />

                <CustomDatePicker
                    label="Election date"
                    onChange={value => formik.setFieldValue('electionDate', value)}
                    value={moment(formik.values.electionDate)}
                    error={formik.touched.birthDate && Boolean(formik.errors.electionDate)}
                    /*TODO: don't commit*/
                    // minDate={moment().add(2, 'w')}
                    textFieldProps={{
                        helperText: formik.touched.electionDate && formik.errors.electionDate,
                        error: formik.touched.electionDate && Boolean(formik.errors.electionDate)
                    }}
                />

                <CandidateSelect onSelect={onSelectCandidate} candidates={candidates} selectedCandidatesIds={formik.values.candidateIds} {...createDefaultPropsForTextField('candidateIds')} />
                <LoadingButton loading={formik.values.loading}
                               disabled={!formik.dirty || Object.keys(formik.errors)?.length > 0} type='submit'
                               variant='contained' color='primary'>{submitButtonTitle}</LoadingButton>
            </form>

        </CandidateFormWrapper>
    );
};

export default ElectionForm;