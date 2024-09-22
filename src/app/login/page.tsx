'use client'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormularioLogin } from '@/DTOS/FormularioLogin';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const instanceAxios = axios.create({
    baseURL: 'https://authmodule.localfix.mx',
    withCredentials: true
})

const Login = () => {
    const [disabledBL, setDissabledBL] = useState(false)

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
                                <div className="flex justify-center items-center h-screen bg-blue-900">
                                    <div className="w-96 p-5 shadow-lg bg-white rounded-md text-black">
                                        <h1 className='text-3xl block text-center'>Login</h1>
                                        <hr className='mt-3' />
                                        <label className='block text-base mt-3 mb-2'>
                                            Usuario
                                        </label>
                                        <Field
                                            type="text"
                                            name="email"
                                            autoComplete="off"
                                            placeholder="Ingrese Correo Electronico"
                                            className="border w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
                                        ></Field>
                                        <ErrorMessage
                                            name='email'
                                        >{message =>
                                            <div className="text-red-700">
                                                {message}
                                            </div>
                                            }</ErrorMessage>
                                        <label className='block text-base mt-3 mb-2'>
                                            Contraseña
                                        </label>

                                        <Field
                                            type="password"
                                            name="passkey"
                                            autoComplete="off"
                                            placeholder="Ingrese Contraseña"
                                            className="border w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                                        ></Field>
                                        <ErrorMessage
                                            name='passkey'
                                        >{message =>
                                            <div className="text-red-700">
                                                {message}
                                            </div>
                                            }</ErrorMessage>
                                        <button
                                            type="submit"
                                            className='border-2 border-pumpkin bg-pumpkin text-black py-1 px-5 w-full mt-3 rounded-md hover:bg-transparent hover:text-red-700'
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