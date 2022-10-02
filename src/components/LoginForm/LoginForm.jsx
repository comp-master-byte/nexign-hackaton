import React, { useState, useEffect } from 'react';
import styles from './LoginForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginFormAction } from '../../redux/asyncActions/loginFormAction';
import { MyButton } from '../../UI/MyButton/MyButton';
import { MyInput } from '../../UI/MyInput/MyInput';

export const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.login.isLogged)

    const [loginForm, setLoginForm] = useState({ login: '', password: '' });

    const submitRegistrationForm = event => {
        event.preventDefault();
        dispatch(loginFormAction(loginForm));
    }

    useEffect(() => {
        if (isLogged) {
            navigate('/main')
        }
    }, [isLogged])

    return (
        <div className={styles.loginContent}>
            <div className={styles.loginInner}>
                <div className={styles.loginInner__title}>Войти в систему</div>
                <form className={styles.loginForm}>
                    <div className={styles.loginInputs}>
                        <MyInput
                            placeholder='Логин'
                            value={loginForm.login}
                            onChange={event => setLoginForm({ ...loginForm, login: event.target.value })}
                            className={styles.loginInputs__input}
                        />
                        <MyInput
                            placeholder='Пароль'
                            value={loginForm.password}
                            onChange={event => setLoginForm({ ...loginForm, password: event.target.value })}
                            className={styles.loginInputs__input}
                        />
                    </div>
                    <div className={styles.loginButtons}>
                        <MyButton onClick={submitRegistrationForm} buttonText='Войти в систему' />
                        <Link to='/auth' className={styles.loginButtons__registration}>Зарегистрироваться</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}