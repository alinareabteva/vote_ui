import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import CustomDatePicker from "../../../../primitives/CustomDatePicker/CustomDatePicker";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import {LoadingButton} from "@mui/lab";
import {MAX_BIRTH_DATE, MIN_BIRTH_DATE, useCandidateFormState} from "./useCandidateFormState";
import {CandidateFormWrapper} from "./CandidateFormStyles";

const CandidateForm = ({initialValues, submitButtonTitle = 'Add Candidate', formTitle = 'Add Candidate', submitHandler}) => {
    const {formik, createDefaultPropsForTextField} = useCandidateFormState({initialValues, submitHandler});
    return (
        <CandidateFormWrapper>
            <form onSubmit={formik.handleSubmit}>
                <h1> {formTitle} </h1>
                <TextField
                    fullWidth
                    label='First Name'
                    placeholder="Enter candidate first name"
                    name="firstName"
                    {...createDefaultPropsForTextField('firstName')}
                />
                <TextField
                    fullWidth
                    label='Last Name'
                    placeholder="Enter candidate name"
                    name="lastName"
                    {...createDefaultPropsForTextField('lastName')}
                />
                <TextField
                    fullWidth
                    label='IDNP'
                    placeholder="Enter candidate IDNP"
                    name="idnp"
                    {...createDefaultPropsForTextField('idnp')}
                />
                <CustomDatePicker
                    label="Date of Birth"
                    onChange={value => formik.setFieldValue('birthDate', value)}
                    value={formik.values.birthDate}
                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                    minDate={MIN_BIRTH_DATE}
                    maxDate={MAX_BIRTH_DATE}
                    textFieldProps={{
                        helperText: formik.touched.birthDate && formik.errors.birthDate,
                        error: formik.touched.birthDate && Boolean(formik.errors.birthDate)
                    }}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender"
                                style={{display: 'initial'}} {...createDefaultPropsForTextField('gender')}>
                        <FormControlLabel value="female" control={<Radio value="F"/>} label="Female"/>
                        <FormControlLabel value="male" control={<Radio value="M"/>} label="Male"/>
                    </RadioGroup>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Education
                    </InputLabel>
                    <NativeSelect
                        inputProps={{
                            name: 'education',
                            id: 'uncontrolled-native',
                        }}
                        {...createDefaultPropsForTextField('education')}
                    >
                        <option value="NONE"/>
                        <option value="SECONDARY">Secondary Education</option>
                        <option value="TECHNICAL">Technical Education</option>
                        <option value="HIGHER">Higher Education</option>
                    </NativeSelect>
                </FormControl>

                <TextField
                    fullWidth label='Email'
                    placeholder="Enter candidate email"
                    name="email"
                    {...createDefaultPropsForTextField('email')}
                />

                <TextField
                    fullWidth label='Number of signatures'
                    placeholder="Enter candidate number of signatures"
                    name="numberOfSignatures"
                    type="number"
                    {...createDefaultPropsForTextField('numberOfSignatures')}
                />
                <TextField
                    fullWidth label='Party name'
                    placeholder="Enter candidate's party name"
                    name="party"
                    {...createDefaultPropsForTextField('party')}
                />
                <LoadingButton loading={formik.values.loading}
                               disabled={!formik.dirty || Object.keys(formik.errors)?.length > 0} type='submit'
                               variant='contained' color='primary'>{submitButtonTitle}</LoadingButton>
            </form>

        </CandidateFormWrapper>
    );
};

export default CandidateForm;