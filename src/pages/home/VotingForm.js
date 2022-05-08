import React, {useState} from 'react';
import CandidateSelect from "../elections/ElectionForm/CandidateSelect";
import {LoadingButton} from "@mui/lab";
import {VotingApi} from "../../api/VotingApi";
import SuccessModal from "./SuccessModal";
import tokenUtility from "../../api/base/tokenUtility";
import {ROUTES_PATHS} from "../../layout/routes-constants";
import {useNavigate} from "react-router";

const VotingForm = ({election}) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        candidate: null,
        loading: false,
        submitted: false,
    })


    const onCandidateSelect = ({target: {value}}) => {
        setState(prevState => ({
            ...prevState,
            candidate: value
        }))
    }

    const setLoading = (loading) => {
        setState((prevState) => ({
            ...prevState,
            loading
        }))
    }
    const submitVote = () => {
        setLoading(true)
        VotingApi.submitVoting({
            candidateId: state.candidate,
            electionId: election.id
        }).then(() => {
          setState((prevState) => ({
              ...prevState,
              submitted: true,
          }))
        }).finally(() => setLoading(false))
    }

    const onClose = () => {
        tokenUtility.clear();
        navigate(ROUTES_PATHS.LOGIN_PAGE)
    }

    return (
        <div className="election">
            <h2>{election.title}</h2>
            <CandidateSelect candidates={election?.candidates} selectedCandidatesIds={[state.candidate]} onSelect={onCandidateSelect}/>
            <LoadingButton loading={state.loading}
                           onClick={submitVote}
                           disabled={!state.candidate} type='submit'
                           variant='contained' color='primary'>Vote</LoadingButton>
            <SuccessModal onClose={onClose} open={state.submitted} />
        </div>
    );
};

export default VotingForm;