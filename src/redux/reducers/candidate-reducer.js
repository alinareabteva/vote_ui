import {CandidateTypes} from "../action-types/candidate-types";

const initialState = {
    addedCandidate: null,
    editedCandidate: null,
    deletedCandidate: null,
    candidates: []
};

export const candidateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CandidateTypes.SET_CANDIDATES: {
            const {candidates} = action;
            return {
                ...state,
                candidates,
            };
        }
        case CandidateTypes.ADD_CANDIDATE: {
            const {addedCandidate} = action;
            return {
                ...state,
                addedCandidate,
            };
        }
        case CandidateTypes.EDIT_CANDIDATE: {
            const {editedCandidate} = action;
            return {
                ...state,
                editedCandidate,
            };
        }
        case CandidateTypes.DELETE_CANDIDATE: {
            const {deletedCandidate} = action;
            return {
                ...state,
                deletedCandidate,
            };
        }
        default: {
            return state;
        }
    }
};
