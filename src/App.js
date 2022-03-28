import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import VotOnlineRoutes from "./layout/VotOnlineRoutes";

import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./redux/reducers/root-reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
                    <Router>
                        <VotOnlineRoutes/>
                    </Router>
                </div>
            </div>
        </Provider>

    );
}

export default App;
