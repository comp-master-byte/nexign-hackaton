import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.scss';
import { MyInput } from '../../UI/MyInput/MyInput.jsx';
import { MyButton } from '../../UI/MyButton/MyButton.jsx';
import { registerFormAction } from '../../redux/asyncActions/registerFormAction.js';

export const RegistrationForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registrationData, setRegistrationData] = useState({
        login: '',
        password: '',
        phone: '',
        tgName: '',
        fio: ''
    });

    const submitRegistrationData = () => {
        dispatch(registerFormAction(registrationData));
        navigate('/');
    }

    return (
        <div className={styles.registrationForm}>
            <div className={styles.registrationInner}>
                <div className={styles.registrationInner__title}>Создайте наш аккаунт</div>
                <div className={styles.registrationFields}>
                    <MyInput
                        placeholder='Логин'
                        value={registrationData.login}
                        onChange={event => setRegistrationData({ ...registrationData, login: event.target.value })}
                        className={styles.registrationFields__input}
                    />
                    <MyInput
                        placeholder='Пароль'
                        value={registrationData.password}
                        onChange={event => setRegistrationData({ ...registrationData, password: event.target.value })}
                        className={styles.registrationFields__input}
                    />
                    <MyInput
                        placeholder='Телефон'
                        value={registrationData.phone}
                        onChange={event => setRegistrationData({ ...registrationData, phone: event.target.value })}
                        className={styles.registrationFields__input}
                    />
                    <MyInput
                        placeholder='tg-username'
                        value={registrationData.tgName}
                        onChange={event => setRegistrationData({ ...registrationData, tgName: event.target.value })}
                        className={styles.registrationFields__input}
                    />
                    <MyInput
                        placeholder='ФИО'
                        value={registrationData.fio}
                        onChange={event => setRegistrationData({ ...registrationData, fio: event.target.value })}
                        className={styles.registrationFields__input}
                    />
                </div>
                <div className={styles.registrationButtons}>
                    <MyButton onClick={submitRegistrationData} buttonText='Зарегистрироваться' />
                    <Link to='/' className={styles.registrationButtons__link}>Вернуться назад</Link>
                </div>
            </div>
        </div>
    )
}
