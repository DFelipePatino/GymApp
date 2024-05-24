import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './Login.css';
import { Grow } from '@mui/material';

function LogIn() {

    useEffect(() => {
        window.scrollTo(0, 0);
    });

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
    console.log(isLoading, "is loading");

    const [formShown, setFormShown] = useState(true);
    console.log(formShown, "form shown");

    const [loadingShown, setLoadingShown] = useState(false);
    console.log(loadingShown, "loading shown");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
        if (password !== onlyPassword) {
            alert('Password incorrecto');
            return;
        } else if (password === onlyPassword) {
            localStorage.setItem("localUserName", username);

            console.log(localStorage.getItem("localUserName"), "has been set");

            setFormShown(false)

            setTimeout(() => {
                setLoadingShown(true)
                setIsLoading(true)
            }, 500);

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

                <Grow
                    in={loadingShown}
                    style={{ transformOrigin: '1 1 1' }}
                    {...(loadingShown ? { timeout: 1000 } : {})}
                >
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
                    </div>
                </Grow>

                :

                <Grow
                    in={formShown}
                    // out={checked}
                    style={{ transformOrigin: '1 1 1' }}
                    {...(formShown ? { timeout: 1000 } : {})}
                >
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
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                />
                                <br />
                                <a href='/form'>¿Olvidaste tu contraseña?</a>
                            </form>


                            <br />
                            <button
                                className='register'
                                onClick={() => { navigate('/registro'); }}
                            >Registrate</button>
                            <p>¿Aun no tienes cuenta?</p>


                            {/* <footer className='footer'>
                            <p>OneGym 2024 </p>
                        </footer> */}
                        </section>
                    </div>
                </Grow>


            }

            <section className='ropeimage'>
                <img src="rope.jpeg" alt="rope guy" />
            </section>


        </div >



    );
}

export default LogIn;