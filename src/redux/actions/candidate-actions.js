import {CandidateTypes} from "../action-types/candidate-types";

export const setCandidates = (candidates = []) => {
    return {
        type: CandidateTypes.SET_CANDIDATES,
        candidates
    }
}

export const setAddedCandidate = (addedCandidate = null) => {
    return {
        type: CandidateTypes.ADD_CANDIDATE,
        addedCandidate
    }
}

export const setEditedCandidate = (editedCandidate = null) => {
    return {
        type: CandidateTypes.EDIT_CANDIDATE,
        editedCandidate
    }
}

export const setDeletedCandidate = (deletedCandidate = null) => {
    return {
        type: CandidateTypes.EDIT_CANDIDATE,
        deletedCandidate
    }
}