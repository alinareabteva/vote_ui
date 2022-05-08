import React from 'react';
import {FormControl, MenuItem, Select} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import styled from "@emotion/styled"
import CheckIcon from '@mui/icons-material/Check';

const StyledList = styled.ul`
  overflow: auto;
  max-height: 40vh;
  margin-top: 20px;
  padding-left: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 5px;
`

const CandidateSelectWrapper = styled.div`
  .candidates-select-label {
    position: relative;
    list-style-type: none;

    li {
    }
  }
`

const CandidateSelect = ({ candidates, selectedCandidatesIds = [], onSelect }) => {
    return (
        <CandidateSelectWrapper>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="candidates" className="candidates-select-label">
                    Candidates
                </InputLabel>
                <StyledList id="candidates">
                    {candidates.map(c => (
                        <MenuItem
                            key={c.id}
                            value={c.id}
                            selected={selectedCandidatesIds.includes(c.id)}
                            onSelect={onSelect}
                            onClick={onSelect}
                        >
                            {selectedCandidatesIds.includes(c.id) && <CheckIcon />}{c.firstName + " " + c.lastName + " (" + c.party + ")"}
                        </MenuItem>
                    ))}
                </StyledList>
            </FormControl>
        </CandidateSelectWrapper>
    );
};

export default CandidateSelect;