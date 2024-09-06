import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from "../components/Footer";

import styles from './Layout.module.css';

function Layout() {
    return (
        <div className={styles.container}>
            <Header />    
                <section className={styles.main}>
                    <Outlet />
                </section>
            <Footer />
        </div>
    );
}

export default Layout;

