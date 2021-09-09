import React from 'react';
import classes from './MyButton.module.css'

const MyButton = ({children, disable, ...props}) => {
    const finalClassName = `${disable ? classes.disable : classes.myButton}`
    return (
        <button
            className={finalClassName}
            {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;