import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {

    const navigate = useNavigate();


    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        edad: "31"
        // Add more fields as needed
    });

    useEffect(() => {

        const localUser = localStorage.getItem("localUserName")
        console.log(localUser, "lu en profile");

        const verifyLogin = (localUser) => {
            if (!localUser) {
                navigate("/");
            }
        }
        verifyLogin(localUser);

        window.scrollTo(0, 0);

    }, [navigate]);

    console.log(user, "user");

    const handleInputChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const handleEditClick = () => {
        // setIsEditing(!isEditing);
        navigate("/profileedit")
    };

    // const editphoto = () => {
    //     alert("Editar foto");
    // };

    return (
        <div className='profilesection'>

            {isEditing ? (

                <div >
                    {/* <section className='background2'>
    <img src="onegym2_edited.jpeg" alt="background" />
</section> */}

                    <h1>Welcome</h1>
                    <br />



                    <section className='firsthalf'>


                        <form>
                            <section className='firstsec'>
                                <label className='minombre'>
                                    <h3>Mi nombre</h3>
                                    <input type="text" value={user.name} readOnly />
                                </label>
                                <br />
                                <label className='miemail'>
                                    <h3>Mi email</h3>
                                    <input type="email" value={user.email} readOnly />
                                </label>
                                <br />
                            </section>

                            <div className='secondsec'>

                                <section className='misalud'>
                                    <h3>Mi salud</h3>
                                </section>
                            </div>

                            <div className='thirdsec'>

                                <section className='misobjetivos'>
                                    <h3>Mis objetivos</h3>
                                </section>
                            </div>
                        </form>

                    </section>



                    <section className='secondhalf'>


                        <section className='profilepicsec'
                        // onClick={editphoto}
                        >
                            <img className='profilepic' src="Perfil.png" alt="perfil" />
                        </section>



                        <div className='forthsec'>

                            <section className='midieta'>
                                <h3>Mi dieta</h3>
                            </section>
                        </div>

                        <div className='fifthsec'>
                            <section className='planentrenamiento'>
                                <h3>Plan de entrenamiento</h3>
                            </section>
                        </div>

                    </section>

                    <br />
                    <section className='editbutton'>
                        <button onClick={handleEditClick}>Edit</button>
                    </section>
                </div >
                // <form>
                //     <label>
                //         Name:
                //         <input type="text" name="name" value={user.name} onChange={handleInputChange} />
                //     </label>
                //     <label>
                //         Email:
                //         <input type="email" name="email" value={user.email} onChange={handleInputChange} />
                //     </label>
                //     {/* Add more fields as needed */}

                // </form>
            ) : (
                <div >
                    {/* <section className='background2'>
                        <img src="onegym2_edited.jpeg" alt="background" />
                    </section> */}

                    <h1>Welcome</h1>
                    <br />



                    <section className='firsthalf'>

                        <div >
                            <ul className='firstsec'>
                                <li className='minombre'>
                                    <h3>Mi nombre</h3>
                                    <p>{user.name}</p>
                                </li>
                                <br />
                                <li className='miemail'>
                                    <h3>Mi email</h3>
                                    <p>{user.email}</p>
                                </li>
                                <br />
                                <li className='miedad'>
                                    <h3>Mi edad</h3>
                                    <p>{user.edad}</p>
                                </li>
                            </ul>

                            <div className='secondsec'>

                                <section className='misalud'>
                                    <h3>Mi salud</h3>
                                </section>
                            </div>

                            <div className='thirdsec'>

                                <section className='misobjetivos'>
                                    <h3>Mis objetivos</h3>
                                </section>
                            </div>
                        </div>

                    </section>



                    <section className='secondhalf'>

                        <section className='profilepicsec'
                        // onClick={editphoto}
                        >
                            <img className='profilepic' src="Perfil.png" alt="perfil" />
                        </section>



                        <div className='forthsec'>

                            <section className='midieta'>
                                <h3>Mi dieta</h3>
                            </section>
                        </div>

                        <div className='fifthsec'>
                            <section className='planentrenamiento'>
                                <h3>Plan de entrenamiento</h3>
                            </section>
                        </div>

                    </section>

                    <br />
                    <section className='editbutton'>
                        <button onClick={handleEditClick}>Edit</button>
                    </section>
                </div >
            )
            }
        </div >
    );
}

export default Profile;



