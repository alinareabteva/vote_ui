import {VotingTypes} from "../action-types/voting-types";

export function setCurrentVoting(currentVoting) {
    return {
        type: VotingTypes.SET_CURRENT_VOTING,
        currentVoting,
    };
}
