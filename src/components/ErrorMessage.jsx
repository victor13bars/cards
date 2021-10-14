import React from 'react';
import Alert from "react-bootstrap/Alert";
import {useSelector} from "react-redux";

const ErrorMessage = () => {
    const error = useSelector(state => state.auth.error)
    const isError = useSelector(state => state.auth.isError)
    return (
        <div style={{marginTop:"40px"}}>
            <Alert variant="danger">
                <Alert.Heading>An error has occurred!</Alert.Heading>
                <div className="errorMessage">
                    <p>
                        {error}
                    </p>
                </div>

            </Alert>
        </div>

    );
};

export default ErrorMessage;