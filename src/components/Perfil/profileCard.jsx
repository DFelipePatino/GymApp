import React from 'react';
import profilePic from "../../../public/Perfil.png"
import './profileCard.css';

const ProfileCard = () => {
    return (
        <div className='container'>
        <div className='gradiant'> </div>
        <div className='profile'>

            <img src={profilePic} alt="profilePic" />

            <div className='name'>
                Name
            </div>

            <div className='description'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis laborum quaerat eos mollitia deserunt!
            </div>

            <div className='contact'>
                <a className='button' href='/home'>Ver Perfil</a>
            </div>

        </div>

    </div>

);

    
};

export default ProfileCard;