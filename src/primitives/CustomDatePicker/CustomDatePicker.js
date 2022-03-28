import React from 'react';
import {DesktopDatePicker, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {TextField} from "@mui/material";

const CustomDatePicker = ({onChange, value, label, textFieldProps, ...restDatePickerProps}) => {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
                label={label}
                inputFormat="DD/MM/yyyy"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} {...textFieldProps} />}
                {...restDatePickerProps}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;