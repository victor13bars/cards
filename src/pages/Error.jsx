import React from 'react';
import {useSelector} from "react-redux";

const Error = () => {
    let textError = useSelector(state => state.auth.error)
    return (
        <div>
            <h1>{textError}</h1>
        </div>
    );
};

export default Error;