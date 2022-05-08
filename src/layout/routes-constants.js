import SignInOutContainer from "../containers/SignInOutContainer";
import SubmitEmailVerificationContainer from "../containers/SubmitEmailVerificationContainer";
import {Home} from "../pages/candidates/Home";
import AddCandidate from "../pages/candidates/AddCandidate/AddCandidate";
import {CandidateList} from "../pages/candidates/CandidatesList/CandidateList";
import MainLayout from "./MainLayout/MainLayout";
import EditCandidate from "../pages/candidates/EditCandidate/EditCandidate";
import {ElectionsMainPage} from "../pages/elections/ElectionsMainPage";
import CreateElection from "../pages/elections/CreateElection/CreateElection";
import EditElection from "../pages/elections/EditElection/EditElection";

export const ROUTES_PATHS = {
    HOME_PAGE: "/",
    LOGIN_PAGE: "/login",
    SUBMIT_EMAIL_VERIFICATION_PAGE: "/submit-email-verification/:id",
    CANDIDATES: '/candidates',
    ADD_CANDIDATE: '/candidates/add',
    EDIT_CANDIDATE: '/candidates/:id',
    ELECTIONS: '/elections',
    CREATE_ELECTION: '/elections/create',
    EDIT_ELECTION: '/elections/:id'
}

export const MENU_PAGES = [
    {
        to: ROUTES_PATHS.CANDIDATES,
        label: 'CANDIDATES'
    },
    {
        to: ROUTES_PATHS.ELECTIONS,
        label: 'ELECTIONS'
    }
]

export const ROUTES_ACCESS_LEVEL = {
    PRIVATE: "PRIVATE",
    PUBLIC: "PUBLIC"
}

export const VOT_ONLINE_PAGES = [
    {
        path: ROUTES_PATHS.HOME_PAGE,
        element: <MainLayout><Home /></MainLayout>,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PRIVATE
    },
    {
        path: ROUTES_PATHS.ADD_CANDIDATE,
        element: <MainLayout><AddCandidate /></MainLayout>,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PRIVATE
    },
    {
        path: ROUTES_PATHS.EDIT_CANDIDATE,
        element: <MainLayout><EditCandidate /></MainLayout>,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PRIVATE
    },
    {
        path: ROUTES_PATHS.CANDIDATES,
        element: <MainLayout><CandidateList /> </MainLayout>,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PRIVATE
    },
    {
        path: ROUTES_PATHS.ELECTIONS,
        element: <MainLayout><ElectionsMainPage /> </MainLayout>,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PRIVATE
    },
    {
        path: ROUTES_PATHS.CREATE_ELECTION,
        element: <MainLayout><CreateElection /> </MainLayout>,
        exact: true,
        permission: ROUTES_ACCESS_LEVEL.PRIVATE
    },
    {
        path: ROUTES_PATHS.EDIT_ELECTION,
        element: <MainLayout><EditElection /> </MainLayout>,
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