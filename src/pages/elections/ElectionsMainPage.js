import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";

import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router";
import {ElectionsApi} from "../../api/ElectionsApi";
import {setElections} from "../../redux/actions/election-actions";
import {ROUTES_PATHS} from "../../layout/routes-constants";
import moment from "moment";
import SimpleModal from "../../primitives/modal/SimpleModal";


export const ElectionsMainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {elections} = useSelector(state => state?.elections)
    const [state, setState] = useState({
        selected: new Set(),
        elections
    })

    const [errors, setErrors] = useState({
        errors: {},
        showErrors: false
    })


    useEffect(() => {
        ElectionsApi.getElections()
            .then(elections => dispatch(setElections(elections)))
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
                selected: checked ? new Set(elections.map(c => c.id)) : new Set()
            }
        })
    }

    const onClickDelete = (e) => {

        ElectionsApi.deleteAll(Array.from(state.selected)).then(() => {
            setState(prevState => ({
                ...prevState,
                selected: new Set()
            }))
            ElectionsApi.getElections()
                .then(data => dispatch(setElections(data)))
        }).catch(e => {
            debugger
            // {Object.entries(errors?.errors).map(([key, value]) => <div>{key + " :"  +value }</div>)}
               setErrors({
                   showErrors: true,
                   errors: e?.response?.data
               })
            }
        )
    }

    const setShowErrors = (showErrors) => {
        setErrors(prevState => ({
            ...prevState,
            showErrors
        }));
    }

    const onClickCloseErrorModal = () => setShowErrors(false);

    return (
        <TableContainer className="elections-list">
            <EnhancedTableToolbar numSelected={state.selected.size} onClickDelete={onClickDelete}/>
            <Table>
                <EnhancedTableHead
                    numSelected={state.selected.size}
                    // order={order}
                    // orderBy={orderBy}
                    onSelectAllClick={onSelectAllClick}
                    // onRequestSort={handleRequestSort}
                    rowCount={elections.length}
                />
                <TableBody>
                    {elections.map(row => <TableRow
                            hover
                            onClick={(event) => onSelectClick(event, row.id)}
                            role="checkbox"
                            aria-checked={false}
                            tabIndex={-1}
                            key={row.id}
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
                                {row.title}
                            </TableCell>
                            <TableCell>{moment(row?.startDate).format('DD/MM/yyyy')}</TableCell>
                            <TableCell>{row?.candidates?.length}</TableCell>
                            <TableCell>{moment(row.updated).format('DD/MM/yyyy HH:mm:SS')}</TableCell>
                            <TableCell>{row?.updatedBy?.email}</TableCell>
                            <TableCell><Button data-id={row.id}
                                               onClick={() => navigate(ROUTES_PATHS.EDIT_ELECTION.replace(":id", row.id))}><EditIcon/></Button></TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table>
            <SimpleModal
                open={errors.showErrors}
                onClose={onClickCloseErrorModal}
            >
                {Object.entries(errors.errors).map(([key, value]) => (key + ': ' + value))}
            </SimpleModal>
        </TableContainer>
    )
}
