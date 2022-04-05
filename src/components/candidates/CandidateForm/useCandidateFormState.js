import moment from "moment";
import {useFormik} from "formik";
import * as Yup from "yup";

export const MIN_BIRTH_DATE = moment().subtract(115, 'years');
export const MAX_BIRTH_DATE = moment().endOf('day').subtract(18, 'years');

const defaultInitialFormValues = {
    firstName: "",
        lastName: "",
        idnp: "",
        birthDate: null,
        gender: "",
        education: "NONE",
        email: "",
        numberOfSignatures: undefined,
        loading: false,
        party: ""
}

export const useCandidateFormState = ({initialValues = defaultInitialFormValues, submitHandler}) => {
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .min(2, 'Must be at least 2 characters')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),
            idnp: Yup.string()
                .required('Required')
                .matches(/(\d){13}/, 'Should have 13 digits'),
            birthDate: Yup.date()
                .min(MIN_BIRTH_DATE, 'MIN_AGE')
                .max(MAX_BIRTH_DATE, 'MAX_AGE'),
            gender: Yup.string().required('Required'),
            education: Yup.string().oneOf(['SECONDARY', 'TECHNICAL', 'HIGHER']).required('Required'),
            email: Yup.string().email('Invalid email address')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
                .required('Required'),
            numberOfSignatures: Yup.number().min(100_000, 'Candidate should have at least 100 000 of signatures').required('Required'),
            party: Yup.string().required('Required')
        }),
        onSubmit: values => {
            console.log(values)
            setLoading(true)
            const {loading, ...payload} = values;
                   submitHandler(payload)
                    .finally(() => setLoading(false))

        }
    });
    const setLoading = (loading) => formik.setFieldValue('loading', loading)

    const createDefaultPropsForTextField = (fieldName) => {
        return {
            onChange: formik.handleChange,
            value: formik.values[fieldName],
            error: formik.touched[fieldName] && Boolean(formik.errors[fieldName]),
            helperText: formik.touched[fieldName] && formik.errors[fieldName],
            onBlur: formik.handleBlur
        }
    }

    return {formik, createDefaultPropsForTextField}
}