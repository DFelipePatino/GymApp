import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './HeaderNav.css';
import { Height, Padding } from '@mui/icons-material';

const HeaderNav = ({ localUser }) => {

    const navigate = useNavigate();

    console.log(localUser, "lu en headerNav");

    const user = useSelector((state) => state.user);
    console.log(user, "user at navbar");

    const userInitials = localUser.split(' ').map((n) => n ? n[0].toUpperCase() : '').join('');

    // const [userInitials, setUserInitials] = useState('')

    // useEffect((localUser) => {
        // if (localUser !== null) {
        //     navigate("/")
        //     console.log(userInitials, "initials")
        // } else {
            // setUserInitials(localUser.split(' ').map((n) => n ? n[0].toUpperCase() : '').join(''));
    //     }
    // }, [localUser]);

    const ACI = {
        height: '25px',
        width: '25px',
        color: 'white',
        cursor: 'pointer',
        marginRight: "5%",
        Padding: "0px"
    }

    return (
        <>
            {localUser ?

                <nav className="navbar">
                    <a className='extra' href="/">Home</a>
                    <img className='navImage' src='onegym22_edited.jpg' onClick={() => navigate('/home')}></img>

                    {userInitials === "" ? (
                        <AccountCircleIcon style={ACI} />
                    ) : <a className='initials' href='/profile'>{userInitials}</a>}

                </nav> : <div>Loading...</div>

            }
        </>

    );
};

export default HeaderNav;