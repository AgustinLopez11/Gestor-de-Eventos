import Button from 'react-bootstrap/Button';
import { Badge, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useRef, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import ToastComponent from '../components/Toast';

function Login() {

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const valitedSetOut = useRef(null)

    const [ShowError, setShowError] = useState(false)
    const [MessageError, setMessageError] = useState("")

    const onsumit = async (values) => {

        try {
            const response = await api.post("/login", values)
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        }
        catch (error) {
            const error2 = error.response?.data?.message || "Error Inesperado"
            setMessageError(error2)
            setShowError(true)

            if (valitedSetOut.current) {
                clearTimeout(valitedSetOut.current)
            }

            valitedSetOut.current = setTimeout(() => {
                setShowError(false)
            }, 2000);
        }
    }

    return (
        <div className='container  mt-5'>
            <Form onSubmit={handleSubmit(onsumit)}>
                <InputGroup >
                    <InputGroup.Text className='w-25 w-sm-auto' id="basic-addon1">Correo Electrónico</InputGroup.Text>
                    <Form.Control
                        placeholder="...."
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        {...register("email", {
                            required: "El correo es obligatorio", setValueAs: (value) => value.trim()
                        })}
                    />
                </InputGroup>
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                <InputGroup className="mt-3 mb-3">
                    <InputGroup.Text className='w-25 w-sm-auto' id="basic-addon1">Contraseña</InputGroup.Text>
                    <Form.Control
                        placeholder="...."
                        aria-label="password"
                        aria-describedby="basic-addon1"
                        {...register("password", {
                            required: "La contraseña es obligatorio", setValueAs: (value) => value.trim()
                        })}
                    />
                </InputGroup>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                <div className='d-flex justify-content-center'>
                    <Button type='submit' className='btn btn-info' >
                        Iniciar Sesión
                    </Button>
                </div>
            </Form>
            {ShowError && <div>
                <h4 >
                    <Badge bg='danger' className='text-white mt-2 '>{MessageError} ⚠️</Badge>
                </h4>
            </div>}
        </div>
    );
}

export default Login;