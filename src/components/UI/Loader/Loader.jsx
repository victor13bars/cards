import React from 'react';
import classes from './Loader.module.css'

const Loader = () => {
    return (
        <div className={classes.container}>
            <h2>LOADING</h2>
            <div className={classes.loader}>
            </div>
        </div>

    );
};

export default Loader;