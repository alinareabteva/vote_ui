import {ElectionTypes} from "../action-types/election-types";

export const setElections = (elections = []) => {
    return {
        type: ElectionTypes.SET_ELECTIONS,
        elections
    }
}

export const setCreatedElection = (addedElection = null) => {
    return {
        type: ElectionTypes.CREATE_ELECTION,
        addedElection
    }
}

export const setEditedElection = (editedElection = null) => {
    return {
        type: ElectionTypes.EDIT_ELECTION,
        editedElection
    }
}

export const setCurrentElection = (currentElection = null) => {
    return {
        type: ElectionTypes.CURRENT_ELECTION,
        currentElection
    }
}

export const setDeletedElection = (deletedElection = null) => {
    return {
        type: ElectionTypes.DELETE_ELECTION,
        deletedElection
    }
}