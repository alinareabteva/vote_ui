import React, {useEffect} from 'react';
import styled from '@emotion/styled'
import {useDispatch, useSelector} from "react-redux";
import {VotingApi} from "../../api/VotingApi";
import {setCurrentVoting} from "../../redux/actions/voting-actions";
import VotingForm from "./VotingForm";

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .candidate-select {
    width: 40rem;
  }
  button {
    width: 100%;
  }
`

export const Home = () => {
    const dispatch = useDispatch()
    const {currentVoting} = useSelector(state => state?.voting)
    useEffect(() => {
        if (!currentVoting) {
            VotingApi.getTodayVoting().then((currentVoting) => {
                dispatch(setCurrentVoting(currentVoting))
            })
        }

    }, [currentVoting])

    return (
        <HomePageWrapper>
            <h1>Elections</h1>
            {!!currentVoting?.election && !currentVoting.userVoted && (
              <VotingForm election={currentVoting.election} />
            )}
            {currentVoting?.userVoted && "User Voted"}
            {!!currentVoting && !currentVoting.election && "We dont have elections today"}

        </HomePageWrapper>
    )
}
