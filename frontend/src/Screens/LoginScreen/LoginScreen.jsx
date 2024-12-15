import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../Components'

const LoginScreen = () => {
    const [error, setError] = useState({
        email: undefined,
        password: undefined
    })

    const form_fields = [
        {
            label_text: 'Ingresa el email:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'joedoe@example.com'
            }
        },
        {
            label_text: 'Ingresa la contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'password',
                id: 'password',
                name: 'password'
            }
        }
    ]

    const initial_state_form = {
        email: "",
        password: ""
    }

    const navigate  = useNavigate()
    const handleLogin = async (formState) =>{
        const responseHTTP = await fetch('http://localhost:3000/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState)
            }
        )
        const data = await responseHTTP.json()
        switch (responseHTTP.status) {
            case 400:
                setError(data.message)
                break;
            case 404:
                setError({email: [{message:"email incorrecto"}]})
                break;
            case 401:
            case 403:
                setError({password: [{message:"email o contrasena incorrecto"}]})
                break;
            case 200:
                sessionStorage.setItem('access-token', data.access_token)
                navigate('/')
                break;
        }
    }
    
    return (
        <div>
            <h1>Inicia Sesion</h1>
            <Form form_fields={form_fields} action={handleLogin} initial_state_form={initial_state_form} error={error}>
                <button type='submit'>Iniciar Sesion</button>
            </Form>
        </div>
    )
}

export default LoginScreen