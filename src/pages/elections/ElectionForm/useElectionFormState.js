import {useFormik} from "formik";
import * as Yup from "yup";
import moment from "moment";

const defaultInitialFormValues = {
    title: "",
    //TODO: should be always sunday ( and we can select this date in future only ( at least two week earlier) )
    electionDate: "",
    candidateIds: [],
    loading: false
}

export const useElectionFormState = ({initialValues = defaultInitialFormValues, submitHandler}) => {
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),

            electionDate: Yup.date()
                //TODO
                .required('Required'),
            candidateIds: Yup.array()
                .required('Required')
        }),
        onSubmit: values => {
            setLoading(true)
            const {loading, electionDate, ...payload} = values;

            const startDate = moment(electionDate).set('h', 7).toISOString();
            const endDate = moment(electionDate).set('h', 21).toISOString();

            submitHandler({...payload, startDate, endDate})
                .finally(() => setLoading(false))

        }
    });
    const setLoading = (loading) => formik.setFieldValue('loading', loading)

    const toggleCandidate = (candidateId) => {
        let {candidateIds} = formik.values;
        if (candidateIds.includes(candidateId)) {
            candidateIds = candidateIds.filter(id => candidateId !== id)
        } else {
            candidateIds.push(candidateId)
        }
        formik.setFieldValue('candidateIds', candidateIds)
    }

    const createDefaultPropsForTextField = (fieldName) => {
        return {
            onChange: formik.handleChange,
            value: formik.values[fieldName],
            error: formik.touched[fieldName] && Boolean(formik.errors[fieldName]),
            helperText: formik.touched[fieldName] && formik.errors[fieldName],
            onBlur: formik.handleBlur
        }
    }

    return {formik, createDefaultPropsForTextField, toggleCandidate}
}