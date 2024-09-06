import React from 'react'; 
import styles from './Text.module.css';

function Text({children}) {
    return (
        <p className={styles.text}> {children} </p>
    );
}

export default Text;