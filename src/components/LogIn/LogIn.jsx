import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LogIn() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
        navigate('/home');

        // Reset username and password fields
        setUsername('');
        setPassword('');
    };

    return (
        <div className='loginn'>


            <section className='titanimage'>
                <img src="titan.png" alt="titan" />
            </section>
            <section className='logoimage'>
                <img src="onegym.jpeg" alt="one gym logo" />
            </section>

            <header className='welcome'>
                <h1>Welcome</h1>
            </header>

            <section className='formsection'>

                <form
                    className='form'
                    onSubmit={handleSubmit}>
                    <label>
                        <input className='user name' type="text" value={username} placeholder='Usuario' onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        <input className='user password' type="password" value={password} placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <input className="LogInB" type="submit" value="Log In" />
                    <br />
                    <a href=''>¿Olvidaste tu contraseña?</a>
                </form>

                <br />
                <button className='register'>Registrate</button>
                <p>¿Aun no tienes cuenta?</p>


                <section className='ropeimage'>
                    <img src="rope.jpeg" alt="rope guy" />
                </section>

            </section>

        </div>

    );
}

export default LogIn;