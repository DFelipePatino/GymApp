import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMethods, getUser } from '../../redux/actions';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './Login.css';
import { Grow } from '@mui/material';
import Swal from 'sweetalert2';

function LogIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [formShown, setFormShown] = useState(true);
    const [loadingShown, setLoadingShown] = useState(false);

    function calculateAge(dobString) {
        const dob = new Date(dobString);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();

        // Adjust age if the current date is before the birthday in the current year
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        loadGoogleScript();
        isLogged();
    }, []);

    const baseUrl = "https://backdev.onetrainingteam.com/onegym-backtest/api";


    const loadGoogleScript = () => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = autenticarCongoogle;
        document.body.appendChild(script);
    };

    const autenticarCongoogle = () => {
        google.accounts.id.initialize({
            client_id: '662569833008-v986m84utq416ms5677qrjqcns89eldu.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' }
        );

        // google.accounts.id.prompt();

    };

    async function isLogged() {
        const token = await localStorage.getItem("id_token");

        if (token) {
            navigate('/home');
        }
    }

    async function handleCredentialResponse(response) {

        setLoadingShown(true);
        setIsLoading(true);

        const id_token = response.credential;
        localStorage.setItem('id_token', id_token);
        // console.log(response, 'response');
        // console.log(localStorage.getItem('id_token'), 'id_token');

        const registro = await fetch(`${baseUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + id_token
            },
            body: null
        });

        let respuesta = null;
        try {
            respuesta = await registro.json();
        } catch (error) {
            console.error('Error:', error);
        }

        if (!respuesta || respuesta.state !== 'ACTIVE') {
            Swal.fire({
                title: 'Error!',
                html: 'Usuario no registrado. Continua para registrarte.',
                icon: 'error',
                color: 'rgb(255, 255, 255)',
                background: "rgb(0,0,0)",
                backdrop: `rgba(159, 28, 23, 0.4)`,
                confirmButtonText: 'Continuar',
                preConfirm: () => {
                    // Navigate to /registro when "Continuar" is clicked
                    navigate('/registro');
                }
            });
        }
        else if (!respuesta.genero) {
            localStorage.setItem('localUser', JSON.stringify(respuesta));
            navigate('/registro');
        }
        else {
            const age = calculateAge(respuesta.fechaNacimiento);

            const updatedRespuesta = {
                ...respuesta,
                age: age
            };
            console.log(updatedRespuesta, 'updatedRespuesta');


            localStorage.setItem('localUser', JSON.stringify(updatedRespuesta));
            navigate('/home');
        }
    }


    return (
        <div className='loginn'>
            <section className='titanimage'>
                <img src="titan.png" alt="titan" />
            </section>
            <section className='logoimage'>
                <img src="onegym.jpeg" alt="one gym logo" />
            </section>

            {isLoading ? (
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
                        <p>Preparate para una gran experiencia!</p>
                        <Box sx={{ width: '60%', paddingBottom: "104%" }}>
                            <LinearProgress />
                        </Box>
                    </div>
                </Grow>
            ) : (
                <Grow
                    in={formShown}
                    style={{ transformOrigin: '1 1 1' }}
                    {...(formShown ? { timeout: 1000 } : {})}
                >
                    <div>
                        <header className='welcome'>
                            <h1>Welcome</h1>
                        </header>

                        <br />
                        <br />

                        {/* <section className='formsection'>
                            <form className='form' onSubmit={handleSubmit}>
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
                                <p>¿Olvidaste tu contraseña?</p>
                            </form>

                            <br />
                            <p>¿Aun no tienes cuenta?</p> */}
                        {/* <br /> */}
                        <div
                            style={{ display: 'flex', justifyContent: 'center', borderRadius: '40px' }}
                            id="buttonDiv">
                        </div>
                        {/* <br /> */}
                        {/* <button
                                className='register'
                                onClick={() => { navigate('/registro'); }}
                            >Registrate</button> */}


                        <br />
                        {/* <button onClick={traerMultimedia}>Traer datos de multimedia mi perro</button> */}
                        {/* </section> */}
                    </div>
                </Grow>
            )}

            <section className='ropeimage'>
                <img src="rope.jpeg" alt="rope guy" />
            </section>
        </div>
    );
}

export default LogIn;