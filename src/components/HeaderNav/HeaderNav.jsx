import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './HeaderNav.css';
import { Height, Padding } from '@mui/icons-material';

const HeaderNav = () => {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    
    const userInitials = user.split(' ').map((n) => n ? n[0].toUpperCase() : '').join('');

    const ACI = {
        height: '25px',
        width: '25px',
        color: 'white',
        cursor: 'pointer',
        marginRight: "5%",
        Padding: "0px"
    }

    return (
        <nav className="navbar">
            <a className='extra' href="/">Home</a>
            <img className='navImage' src='onegym22_edited.jpg' ></img>

            {userInitials === "" ? (
                <AccountCircleIcon style={ACI} />
            ) : <a className='initials' href='/profile'>{userInitials}</a>}

        </nav>
    );
};

export default HeaderNav;