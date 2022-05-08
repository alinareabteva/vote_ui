import React, {useEffect, useMemo} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {ROUTES_ACCESS_LEVEL, ROUTES_PATHS, VOT_ONLINE_PAGES} from "./routes-constants";
import {useDispatch, useSelector} from "react-redux";
import {AuthApi} from "../api/AuthApi";
import {setCurrentUser} from "../redux/actions/auth-actions";
import tokenUtility from "../api/base/tokenUtility";
import {useNavigate} from "react-router";

const VotOnlineRoutes = () => {
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state?.auth)
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        AuthApi.getMe().then(user => {
            dispatch(setCurrentUser(user))
        }).catch(e => {
            tokenUtility.clear();
            if (!location.pathname?.includes(ROUTES_PATHS.SUBMIT_EMAIL_VERIFICATION_PAGE.replace(":id", ""))){
                navigate(ROUTES_PATHS.LOGIN_PAGE)
            }
        })
    }, [])

    useEffect(() => {
        if (currentUser?.id && location.pathname?.includes(ROUTES_PATHS.LOGIN_PAGE)) {
            navigate(ROUTES_PATHS.HOME_PAGE)
        }
    }, [currentUser?.id])

    let mappedRoutes = useMemo(() => {
        if (currentUser && !currentUser?.roles?.some(r => r.name === "ADMIN")) {
            return VOT_ONLINE_PAGES.filter(routeProps => routeProps.permission === ROUTES_ACCESS_LEVEL.PUBLIC || routeProps.path === ROUTES_PATHS.HOME_PAGE)
        }
        return VOT_ONLINE_PAGES.filter(routeProps => routeProps.permission === ROUTES_ACCESS_LEVEL.PRIVATE ? !!currentUser : true)
    }, [currentUser])

    return (
        <Routes>
            {mappedRoutes.map((routeProps, index) => (
                <Route key={index} {...routeProps} />
            ))}
        </Routes>
    );
};

export default VotOnlineRoutes;