import React from 'react';
import { Redirect } from "react-router-dom";


// the below line was the original line
// const Dashboard = (props) => {

// I haven't created a proper authorisation method yet, 
//I've hard coded authorised for the time being.

const Dashboard = ( { authorised }) => {

    if (!authorised){
        return <Redirect to="/SignInSide" />;
    }
    return (
        <div>
            <h1>DASHBOARD PAGE</h1>
            <p>[TO DO]</p>
        </div>
    )
}

export { Dashboard }