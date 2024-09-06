import React from 'react'; 
import styles from './Head.module.css';

function Head({children}) {
    return <h1 className={styles.head}> {children} </h1>;
}

export default Head;