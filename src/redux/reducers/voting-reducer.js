import {VotingTypes} from "../action-types/voting-types";

const initialState = {
    currentVoting: null,
};

export const votingReducer = (state = initialState, action) => {
    switch (action.type) {
        case VotingTypes.SET_CURRENT_VOTING: {
            const {currentVoting} = action;
            return {
                ...state,
                currentVoting,
            };
        }
        default: {
            return state;
        }
    }
};
