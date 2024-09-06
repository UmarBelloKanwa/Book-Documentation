import React from 'react'; 
import styles from './Button.module.css';

function Button({handleClick, children}) {
    return (
        <button className={styles.button} onClick={handleClick}>
            {children}
        </button>
    );
}

export default Button;