import React, { useState } from 'react';
import { LoginContainer, LoginForm, Input, Button } from './Login.styled';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const Login = ({ onLogin }) => { // Acepta la propiedad onLogin
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const defaultUsername = 'admin';
    const defaultPassword = '123';

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar credenciales
        if (credentials.username === defaultUsername && credentials.password === defaultPassword) {
            console.log('Login exitoso');
            setError('');
            onLogin(); // Llama a onLogin cuando las credenciales son correctas
        } else {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };

    return (
        <LoginContainer>
            <h2>Login Administrador</h2>
            <LoginForm onSubmit={handleSubmit}>
                <div>
                    <FaUserAlt />
                    <Input
                        name="username"
                        placeholder="Usuario"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FaLock />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit">Ingresar</Button>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;
