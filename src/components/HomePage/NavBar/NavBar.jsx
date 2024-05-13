import React from 'react'
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ButtonStyle } from './NavBarStyles';
import './NavBar.css';

function NavBar() {


    const navigate = useNavigate();

    const Navs = {

        navprofile: () => {
            navigate("/profile");
        },

        navworkouts: () => {
            navigate("/workouts");
        },

        navchat: () => {
            navigate("/profileCard");
        },

        navlogout: () => {
            localStorage.clear()
            navigate("/");
        },
    }


    return (
        <Container className='nav'>

            <Stack spacing={1} direction="row" justifyContent="center" margin={2}>

                <Button
                    // className={classes.button}
                    variant="contained"
                    onClick={Navs.navprofile}
                    style={ButtonStyle}
                >
                    Profile
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navworkouts}
                    style={ButtonStyle}
                >
                    Workouts
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navchat}
                    style={ButtonStyle}
                >
                    Chat
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navlogout}
                    style={ButtonStyle}
                >
                    Log Out
                </Button>

            </Stack>

        </Container>
    )
}

export default NavBar