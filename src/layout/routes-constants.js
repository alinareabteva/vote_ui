import SignInOutContainer from "../containers/SignInOutContainer";
import SubmitEmailVerificationContainer from "../containers/SubmitEmailVerificationContainer";
import {Home} from "../components/candidates/Home";

export const ROUTES_PATHS = {
    HOME_PAGE: "/",
    LOGIN_PAGE: "/login",
    SUBMIT_EMAIL_VERIFICATION_PAGE: "/submit-email-verification/:id"
}

export const ROUTES_ACCESS_LEVEL = {
    PRIVATE: "PRIVATE",
    PUBLIC: "PUBLIC"
}

export const VOT_ONLINE_PAGES = [
    {
        path: ROUTES_PATHS.HOME_PAGE,
        element: <Home />,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PRIVATE
    },
    {
        path: ROUTES_PATHS.LOGIN_PAGE,
        element: <SignInOutContainer />,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PUBLIC
    },
    {
        path: ROUTES_PATHS.SUBMIT_EMAIL_VERIFICATION_PAGE,
        element: <SubmitEmailVerificationContainer />,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PUBLIC
    },
]