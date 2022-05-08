import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {CandidatesApi} from "../../../api/CandidatesApi";
import {setCandidates} from "../../../redux/actions/candidate-actions";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router";
import {ROUTES_PATHS} from "../../../layout/routes-constants";


export const CandidateList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {candidates} = useSelector(state => state?.candidates)
    const [state, setState] = useState({
        selected: new Set(),
        candidates
    })



    useEffect(() => {
        CandidatesApi.getCandidates()
            .then(candidates => dispatch(setCandidates(candidates)))
    }, [])

    const onSelectClick = ({target: {checked}}, rowId) => {
        setState(prevState => {
            const {selected} = prevState;
            if (checked) {
                selected.add(rowId)
            } else {
                selected.delete(rowId)
            }
            return {
                ...prevState,
                selected
            }
        })
    }

    const onSelectAllClick = ({target: {checked}}) => {
        setState(({selected, ...prevState}) => {
            return {
                ...prevState,
                selected: checked ? new Set(candidates.map(c => c.id)) : new Set()
            }
        })
    }

    const onClickDelete = (e) => {

        CandidatesApi.deleteAll(Array.from(state.selected)).then(() => {
            setState(prevState => ({
                ...prevState,
                selected: new Set()
            }))
            CandidatesApi.getCandidates()
                .then(data => dispatch(setCandidates(data)))
        }).catch(e => {
            //TODO
        }
        )
    }

    return (
        <TableContainer className="candidates-list">
            <EnhancedTableToolbar numSelected={state.selected.size} onClickDelete={onClickDelete}/>
            <Table>
                <EnhancedTableHead
                    numSelected={state.selected.size}
                    // order={order}
                    // orderBy={orderBy}
                    onSelectAllClick={onSelectAllClick}
                    // onRequestSort={handleRequestSort}
                    rowCount={candidates.length}
                />
                <TableBody>
                    {candidates.map(row => <TableRow
                            hover
                            onClick={(event) => onSelectClick(event, row.id)}
                            role="checkbox"
                            aria-checked={false}
                            tabIndex={-1}
                            key={row.idnp}
                            selected={state.selected.has(row.id)}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={state.selected.has(row.id)}
                                    // inputProps={{
                                    //     'aria-labelledby': labelId,
                                    // }}
                                />
                            </TableCell>
                            <TableCell
                                component="th"
                                // id={labelId}
                                scope="row"
                                padding="none"
                            >
                                {row.firstName}
                            </TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell>{row.idnp}</TableCell>
                            <TableCell>{row.birthDate}</TableCell>
                            <TableCell>{row.gender}</TableCell>
                            <TableCell>{row.education}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.numberOfSignatures}</TableCell>
                            <TableCell>{row.party}</TableCell>
                            <TableCell><Button data-id={row.id} onClick={() => navigate(ROUTES_PATHS.EDIT_CANDIDATE.replace(":id", row.id))}><EditIcon/></Button></TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table>
        </TableContainer>
    )
}
