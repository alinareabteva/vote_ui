import React, {useContext, useEffect, useMemo} from 'react';
import {Route, Routes} from "react-router-dom";
import {ROUTES_ACCESS_LEVEL, VOT_ONLINE_PAGES} from "./routes-constants";
import {useDispatch, useSelector} from "react-redux";
import {AuthApi} from "../api/AuthApi";
import {setCurrentUser} from "../redux/actions/auth-actions";

const VotOnlineRoutes = () => {
    const {currentUser} = useSelector(state => state?.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        AuthApi.getMe().then(user => {
            dispatch(setCurrentUser(user))
        })
    }, [])

    let mappedRoutes = useMemo(() => {
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