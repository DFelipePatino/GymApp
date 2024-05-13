import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './Login.css';

function LogIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const localUser = localStorage.getItem("localUserName")

    const setLocalUser = () => {
        // if (localUser !== "") {
        dispatch(getUser(localUser));
        // }
    }
    setLocalUser();

    const onlyPassword = '1234';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false)



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
        if (password !== onlyPassword) {
            alert('Password incorrecto');
            return;
        } else if (password === onlyPassword) {
            localStorage.setItem("localUserName", username);

            console.log(localStorage.getItem("localUserName"), "has been set");

            setIsLoading(true)
        }

        const localUser = localStorage.getItem("localUserName")

        if (localUser) {
            setTimeout(() => {
                navigate('/home');
            }, 5000);
        }

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



            {isLoading ?
                <div className='loading'>
                    <br />
                    <br />
                    Loading...
                    <br />
                    <br />
                    <p>
                        Preparate para una gran experiencia!
                    </p>
                    <Box sx={{ width: '60%', paddingBottom: "104%" }}>
                        <LinearProgress />
                    </Box>
                </div> :

                <div>

                    <header className='welcome'>
                        <h1>Welcome</h1>
                    </header>

                    <section className='formsection'>



                        <form
                            className='form'
                            onSubmit={handleSubmit}>
                            <label>
                                <input className='username' type="text" value={username} placeholder='Usuario' onChange={(e) => setUsername(e.target.value)} />
                            </label>
                            <br />
                            <label>
                                <input className='userpassword' type="password" value={password} placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <br />
                            <input
                                className="LogInB"
                                type="submit"
                                value="Log In"
                                onClick={() => {
                                    window.scrollTo({ top: 1, behavior: 'smooth' });
                                }}
                            />
                            <br />
                            <a href='/form'>¿Olvidaste tu contraseña?</a>
                        </form>


                        <br />
                        <button className='register'>Registrate</button>
                        <p>¿Aun no tienes cuenta?</p>


                        <section className='ropeimage'>
                            <img src="rope.jpeg" alt="rope guy" />
                        </section>


                        {/* <footer className='footer'>
                            <p>OneGym 2024 </p>
                        </footer> */}


                    </section>



                </div>

            }


        </div>



    );
}

export default LogIn;