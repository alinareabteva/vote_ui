import {ElectionTypes} from "../action-types/election-types";


const initialState = {
    addedElection: null,
    editedElection: null,
    deletedElection: null,
    elections: [],
    currentElection: null
};

export const electionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ElectionTypes.SET_ELECTIONS: {
            const {elections} = action;
            return {
                ...state,
                elections,
            };
        }
        case ElectionTypes.CREATE_ELECTION: {
            const {addedElection} = action;
            return {
                ...state,
                addedElection,
            };
        }
        case ElectionTypes.EDIT_ELECTION: {
            const {editedElection} = action;
            return {
                ...state,
                editedElection,
            };
        }
        case ElectionTypes.DELETE_ELECTION: {
            const {deletedElection} = action;
            return {
                ...state,
                deletedElection,
            };
        }
        case ElectionTypes.CURRENT_ELECTION: {
            const {currentElection} = action;
            return {
                ...state,
                currentElection,
            };
        }
        default: {
            return state;
        }
    }
};
