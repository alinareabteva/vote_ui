import React from 'react';
import './App.css';
import SignInOutContainer from './containers';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/candidates/Home";
import { AddUser } from "./components/candidates/AddUser";
import { EditUser } from "./components/candidates/EditUser";
import { GlobalProvider } from "./context/GlobalState";

import Login from "./components/Login";
import Signup from "./components/Signup";

import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="App">
     <SignInOutContainer/>

    <div style={{ maxWidth: "30rem", margin: "4rem auto" }}>
      <GlobalProvider>
        <Router>
            {/* <Route exact path="/" component={() => <Home users={users} setUsers={setUsers} />} /> */}
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/add" component={AddUser} />
            <Route path="/edit/:id" component={EditUser} />
            
        </Router>
      </GlobalProvider>
  </div>
  </div>

  );
}

export default App;
