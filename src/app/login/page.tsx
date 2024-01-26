'use client'

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss'
import { FormularioLogin } from '@/DTOS/FormularioLogin';
import { signIn } from 'next-auth/react';

const instanceAxios = axios.create({
    baseURL: 'https://authmodule.localfix.mx',
    //baseURL: 'https://localhost:3000',
    withCredentials:true
})

const Login = () => {
    const router = useRouter()
    return (
        <>
            <div>
                <div>

                    <Formik
                        initialValues={initialValues}
                        validate={validations}
                        onSubmit={async (values) => {
                           var response = await signIn('credentials', {
                                email: values.email,
                                password: values.passkey,
                                //redirect: false,
                                callbackUrl: '/dashboard/'
                            })

                        }}
                    >
                        {(props) => (
                            <Form>
                                <div className={styles.containerLogin}>
                                    <div className={styles.containerContentLogin}>

                                        <Field
                                            type="text"
                                            name="email"
                                            autoComplete="off"
                                            placeholder="Email"
                                            className={styles.FormStyleField}

                                        ></Field>
                                        <ErrorMessage
                                            name='email'
                                        >{message =>
                                            <div className={styles.FormStyleErrorMessage}>
                                                {message}
                                            </div>
                                            }</ErrorMessage>

                                        <Field
                                            type="password"
                                            name="passkey"
                                            autoComplete="off"
                                            placeholder="Password"
                                            className={styles.FormStyleField}
                                        ></Field>
                                        <ErrorMessage
                                            name='passkey'
                                        >{message =>
                                            <div className={styles.FormStyleErrorMessage}>
                                                {message}
                                            </div>
                                            }</ErrorMessage>
                                        <button
                                            type="submit"
                                            className={styles.FormStyleButton}
                                        >Iniciar Sesion</button>
                                    </div>
                                </div>


                            </Form>
                        )}

                    </Formik>

                </div>
            </div>

        </>
    )
}

const validations = (values: FormularioLogin) => {
    let errors = {} as FormularioLogin;

    if (!values.passkey) {
        errors.passkey = 'Campo Requerido'
    }
    if (!values.email) {
        errors.email = 'Campo Requerido'
    }
    const validationEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!validationEmail.test(values.email.toString()))
        errors.email = 'Correo electronico no valido';

    return errors
}

const initialValues: FormularioLogin = {
    passkey: "",
    email: "",
}

export default Login