import styled from '@emotion/styled'

export const CandidateFormWrapper = styled.div`
    display: flex;
    justify-content: center;
    form {
      max-width: 30rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > * {
        margin-top: 10px;
      }
    }
`