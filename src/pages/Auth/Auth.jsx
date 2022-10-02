import React from 'react';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import styles from './Auth.module.scss';

export const Auth = () => {
    return (
        <div className={styles.authMain}>
            <RegistrationForm />
        </div>
    )
}
