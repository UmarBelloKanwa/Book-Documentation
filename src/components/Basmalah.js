import React from 'react'; 
import styles from './Basmalah.module.css';
import { useModel } from '../models';
function Basmalah() {
    const {t} = useModel();
    return (
        <div className={styles.basmalah}>
            <h1> {t('bismillah')} </h1>
            <h2> {t('salati')} </h2>
        </div>
    );
}

export default Basmalah;