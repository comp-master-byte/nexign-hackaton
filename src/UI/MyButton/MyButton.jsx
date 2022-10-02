import React from 'react';
import styles from './MyButton.module.scss';
import classNames from 'classnames';

export const MyButton = ({ buttonText, onClick, className }) => {
    return (
        <button onClick={onClick} className={classNames(styles.myButton, className)}>
            {buttonText}
        </button>
    )
}
