import React from 'react';
import styles from './HomePage.module.scss';
import { LoginForm } from '../../components/LoginForm/LoginForm.jsx';

export const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <LoginForm />
        </div>
    )
}
