import React from 'react';
import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {visuallyHidden} from "@mui/utils";

const headCells = [
    {
        id: 'firstName',
        numeric: false,
        label: 'First Name',
    },
    {
        id: 'lastName',
        numeric: false,
        label: 'Last Name',
    },
    {
        id: 'idnp',
        numeric: false,
        disablePadding: true,
        label: 'IDNP',
    },
    {
        id: 'birthDate',
        numeric: false,
        disablePadding: true,
        label: 'Birth Date',
    },
    {
        id: 'gender',
        numeric: false,
        disablePadding: true,
        label: 'Gender',
    },
    {
        id: 'education',
        numeric: false,
        disablePadding: true,
        label: 'Education',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
    },
    {
        id: 'numberOfSignatures',
        disablePadding: true,
        label: 'Number of Signatures',
    },
    {
        id: 'party',
        numeric: false,
        disablePadding: true,
        label: 'Party',
    },
    {
        id: 'edit',
        numeric: false,
        disablePadding: true,
        label: '',
    },
]

const EnhancedTableHead = ({onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort}) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;