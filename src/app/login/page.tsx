"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useLoginMutation } from '@/api/auth';
import { validationSchema } from './validation';
import { loginSuccess } from '@/store/slices/authSlice';


const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const { email, password } = values;
      const response = await login({ email, password }).unwrap();
      const { accessToken, refreshToken, user } = response;
      dispatch(loginSuccess({ accessToken, refreshToken, user }));
      router.push('/home');
    } catch (error) {
      setErrorMessage('Неверные данные');
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Введите email"
                className="input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div>
              <label htmlFor="password">Пароль</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Введите пароль"
                className="input"
              />
              <ErrorMessage name="password" component="div"/>
            </div>

            {errorMessage && <div>{errorMessage}</div>}

            <button type="submit" disabled={isLoading}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;