import React from 'react';
import styles from './MyInput.module.scss';
import classNames from 'classnames';

export const MyInput = ({ value, onChange, className, placeholder, disabled }) => {
    return (
        <input
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={classNames(styles.myInput, className, {
                [styles.myInput__disabled]: disabled
            })}
            placeholder={placeholder}
        />
    )
}